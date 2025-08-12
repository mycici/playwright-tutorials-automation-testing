import path from 'path';
import fs from 'fs';

export type Environment = 'qa' | 'dev';

export interface TestUserAccount {
  id?: number;
  email: string;
  password: string;
  role?: string;
}

export interface TestUsersFile {
  users: TestUserAccount[];
  defaultUser: Omit<TestUserAccount, 'id'>;
}

export function loadUsersForEnv(envName: Environment): TestUsersFile {
  const filePath = path.resolve(__dirname, `${envName}/testUser.json`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as TestUsersFile;
}

export function getDefaultUser(envName: Environment): Omit<TestUserAccount, 'id'> {
  return loadUsersForEnv(envName).defaultUser;
}

export function getUsers(envName: Environment): TestUserAccount[] {
  return loadUsersForEnv(envName).users;
}

export function getUserByIdFromEnv(envName: Environment, id: number): TestUserAccount | undefined {
  return getUsers(envName).find(u => u.id === id);
}


