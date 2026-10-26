import bcrypt from 'bcryptjs';
import type { UserRole } from '@/types/next-auth';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  avatarUrl?: string;
}

export const USERS: AppUser[] = [
  {
    id: 'user-admin-01',
    name: 'Quản Trị Viên TechStore',
    email: 'admin@techstore.vn',
    passwordHash: bcrypt.hashSync('Admin@123', 10),
    role: 'admin',
  },
  {
    id: 'user-customer-01',
    name: 'Khách Hàng Thân Thiết',
    email: 'customer@techstore.vn',
    passwordHash: bcrypt.hashSync('Customer@123', 10),
    role: 'user',
  },
];

export function findUserByEmail(email: string): AppUser | undefined {
  return USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): AppUser | undefined {
  return USERS.find((u) => u.id === id);
}

export function verifyPassword(plain: string, hash: string): boolean {
  return bcrypt.compareSync(plain, hash);
}