import { test } from '@playwright/test';
import { getDefaultUser } from './users';

export type Environment = 'qa' | 'dev';

export const ENV: Environment = (process.env.ENV as Environment) || 'qa';

// Global helper function
export function getTestUser() {
  const envName = (test.info().project.name as Environment) || ENV;
  return getDefaultUser(envName);
}


