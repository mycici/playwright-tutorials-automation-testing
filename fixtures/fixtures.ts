import { test as baseTest, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import testUser from '../test-data/testUser.json';

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
  return testUser.users.find(user => user.id === workerId) || testUser.defaultUser;
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
  const response = await context.request.post(
    'https://rahulshettyacademy.com/api/ecom/auth/login',
    {
      form: {
        userEmail: account.email,
        userPassword: account.password
      }
    }
  );

  if (!response.ok()) {
    const errorText = await response.text();
    throw new Error(
      `Authentication failed with status ${response.status()}: ${errorText}`
    );
  }

  const loginData = await response.json();
  
  if (!loginData.token || !loginData.userId) {
    throw new Error('Invalid response: missing token or userId');
  }

  return {
    token: loginData.token,
    userId: loginData.userId
  };
}

/**
 * Sets up browser session with authentication tokens in localStorage
 */
async function setupBrowserSession(context: any, authData: any) {
  const page = await context.newPage();
  
  try {
    await page.goto('https://rahulshettyacademy.com/client');
    
    await page.evaluate(
      ({ token, userId }) => {
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