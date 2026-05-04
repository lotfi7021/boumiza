export type AdminRole = 'super_admin' | 'admin' | 'moderator' | 'project_manager' | 'employee';
export type AdminStatus = 'active' | 'inactive';

export interface Admin {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: AdminRole;
  status: AdminStatus;
  createdAt: string;
  lastLogin: string;
  avatar?: string;
}

export interface AdminFormData {
  name: string;
  email: string;
  phone: string;
  role: AdminRole;
  status: AdminStatus;
  password?: string;
  confirmPassword?: string;
}

export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: 'Super Admin',
  admin: 'Administrateur',
  moderator: 'Modérateur',
  project_manager: 'Chef de Projet',
  employee: 'Employé'
};

export const ROLE_COLORS: Record<AdminRole, string> = {
  super_admin: 'bg-purple-100 text-purple-700',
  admin: 'bg-blue-100 text-blue-700',
  moderator: 'bg-green-100 text-green-700',
  project_manager: 'bg-indigo-100 text-indigo-700',
  employee: 'bg-gray-100 text-gray-700'
};

export const STATUS_LABELS: Record<AdminStatus, string> = {
  active: 'Actif',
  inactive: 'Inactif'
};

export const STATUS_COLORS: Record<AdminStatus, string> = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-700'
};

export const ROLE_DESCRIPTIONS: Record<AdminRole, string> = {
  super_admin: 'Accès complet à toutes les fonctionnalités',
  admin: 'Gestion des utilisateurs et contenus',
  moderator: 'Modération des contenus uniquement',
  project_manager: 'Gestion des projets et équipes',
  employee: 'Accès aux tâches et projets assignés'
};
