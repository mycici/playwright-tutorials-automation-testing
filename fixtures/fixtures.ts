import { test as baseTest, request } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import testUser from '../test-data/testUser.json';

export * from '@playwright/test';
export const test = baseTest.extend<{}, { workerStorageState: string }>({
  // Use the same storage state for all tests in this worker.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  // Authenticate once per worker with a worker-scoped fixture.
  workerStorageState: [async ({ browser }, use) => {
    // Use parallelIndex as a unique identifier for each worker.
    const id = test.info().parallelIndex;
    const fileName = path.resolve(test.info().project.outputDir, `.auth/${id}.json`);

    if (fs.existsSync(fileName)) {
      // Reuse existing authentication state if any.
      await use(fileName);
      return;
    }

    const context = await request.newContext({ storageState: undefined });
    const userIndex = test.info().parallelIndex % testUser.users.length;
    const currentUser = testUser.users[userIndex];

    // Send authentication request. Replace with your own.
    await context.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
      form: {
        'user': currentUser.email,
        'password': currentUser.password
      }
    });
  
    await context.storageState({ path: fileName });
    await context.dispose();
    await use(fileName);
  }, { scope: 'worker' }],
});