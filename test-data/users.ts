import path from 'path';
import fs from 'fs';
import { ENV } from './env';

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

function loadUsers(): TestUsersFile {
  const filePath = path.resolve(__dirname, `${ENV}/testUser.json`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as TestUsersFile;
}

const usersFile = loadUsers();

export const DefaultUser: Omit<TestUserAccount, 'id'> = usersFile.defaultUser;
export const Users: TestUserAccount[] = usersFile.users;

export function getUserById(id: number): TestUserAccount | undefined {
  return Users.find(u => u.id === id);
}


