import { test as baseTest, request} from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { Urls } from '../test-data/common/page-url-endpoints';
import { getUserByIdFromEnv, getDefaultUser, type Environment } from '../test-data/users';

// Centralized user data comes from `test-data/users`

export * from '@playwright/test';

export const test = baseTest.extend<{}, { workerStorageState: string }>({
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  workerStorageState: [
    async ({ browser }, use) => {
      const workerId = test.info().parallelIndex;
      const authFilePath = path.resolve(
        test.info().project.outputDir,
        `.auth/${workerId}.json`
      );

      // Reuse existing authentication if available
      if (fs.existsSync(authFilePath)) {
        await use(authFilePath);
        return;
      }

      // Get user credentials for this worker
      const userAccount = getUserAccount(workerId);
      
      // Authenticate and save state
      const authState = await authenticateUser(browser, userAccount);
      saveAuthState(authFilePath, authState);
      
      await use(authFilePath);
    },
    { scope: 'worker' }
  ],
});

/**
 * Retrieves user account credentials for the specified worker ID
 */
function getUserAccount(workerId: number) {
  const envName = (test.info().project.name as Environment) || 'qa';
  return getUserByIdFromEnv(envName, workerId) || getDefaultUser(envName);
}

/**
 * Authenticates user via API and sets up browser state
 */
async function authenticateUser(browser: any, account: any) {
  const context = await browser.newContext({ storageState: undefined });
  
  try {
    // Perform API authentication
    const authData = await performApiLogin(context, account);
    
    // Set up browser session with authentication tokens
    await setupBrowserSession(context, authData);
    
    // Get storage state and enhance with auth data
    const storageState = await context.storageState();
    return {
      ...storageState,
      token: authData.token,
      userId: authData.userId
    };
  } finally {
    await context.close();
  }
}

/**
 * Performs API login and returns authentication data
 */
async function performApiLogin(context: any, account: any) {
  const baseURL = test.info().project.use?.baseURL as string;
const api = await request.newContext({ baseURL });
try {
  const response = await api.post(Urls.api, {
    form: { userEmail: account.email, userPassword: account.password }
  });

  if (!response.ok())
    throw new Error(`Authentication failed with status ${response.status()}: ${await response.text()}`);

  const loginData = await response.json(); // read before dispose
  if (!loginData.token || !loginData.userId)
    throw new Error('Invalid response: missing token or userId');

  return { token: loginData.token, userId: loginData.userId };
} finally {
  await api.dispose();
}
}

/**
 * Sets up browser session with authentication tokens in localStorage
 */
async function setupBrowserSession(context: any, authData: any) {
  const page = await context.newPage();
  
  try {
    const baseURL = test.info().project.use?.baseURL as string;
    await page.goto(`${baseURL}${Urls.root}`);
    
    await page.evaluate(
      ({ token, userId }: { token: string; userId: string }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
      },
      authData
    );
  } finally {
    await page.close();
  }
}

/**
 * Saves authentication state to file
 */
function saveAuthState(filePath: string, authState: any) {
  const directory = path.dirname(filePath);
  
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  
  fs.writeFileSync(filePath, JSON.stringify(authState, null, 2));
}