// Configuration et constantes de l'application
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || '/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

export const ROUTES = {
  // Front Office
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PORTAL: '/portal',
  
  // Back Office
  DASHBOARD: '/app',
  COMPLAINTS: '/app/complaints',
  EMPLOYEES: '/app/employees',
  TEAMS: '/app/team',
  REPORTS: '/app/reports',
  USERS: '/app/users',
  ADMINS: '/app/admins',
  SETTINGS: '/app/settings',
} as const;

export const PERMISSIONS = {
  SUPER_ADMIN: ['read', 'write', 'delete', 'manage_admins', 'system_config'],
  ADMIN: ['read', 'write', 'delete', 'manage_users'],
  MODERATOR: ['read', 'moderate_content'],
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion réseau',
  UNAUTHORIZED: 'Accès non autorisé',
  FORBIDDEN: 'Action non autorisée',
  NOT_FOUND: 'Ressource non trouvée',
  SERVER_ERROR: 'Erreur serveur interne',
  VALIDATION_ERROR: 'Données invalides',
} as const;