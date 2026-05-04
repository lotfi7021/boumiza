export type UserRole = 'user' | 'premium_user' | 'client';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLogin: string;
  avatar?: string;
  company?: string;
}

export interface UserFormData {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  company?: string;
  password?: string;
  confirmPassword?: string;
}

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  user: 'Utilisateur',
  premium_user: 'Utilisateur Premium',
  client: 'Client'
};

export const USER_ROLE_COLORS: Record<UserRole, string> = {
  user: 'bg-gray-100 text-gray-700',
  premium_user: 'bg-yellow-100 text-yellow-700',
  client: 'bg-blue-100 text-blue-700'
};

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  active: 'Actif',
  inactive: 'Inactif',
  suspended: 'Suspendu'
};

export const USER_STATUS_COLORS: Record<UserStatus, string> = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-700',
  suspended: 'bg-red-100 text-red-700'
};