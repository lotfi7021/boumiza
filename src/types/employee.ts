export type EmployeeRole = 'manager' | 'team_leader' | 'developer' | 'designer' | 'analyst' | 'support' | 'hr' | 'finance';
export type EmployeeStatus = 'active' | 'inactive' | 'on_leave' | 'terminated';
export type ContractType = 'full_time' | 'part_time' | 'contract' | 'intern';

export interface Employee {
  id: string;
  employeeId: string; // ID employé unique (ex: EMP001)
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: EmployeeRole;
  status: EmployeeStatus;
  contractType: ContractType;
  department: string;
  manager?: string; // ID du manager
  hireDate: string;
  salary?: number;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  skills: string[];
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: EmployeeRole;
  status: EmployeeStatus;
  contractType: ContractType;
  department: string;
  manager?: string;
  hireDate: string;
  salary?: number;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  skills: string[];
}

export const EMPLOYEE_ROLE_LABELS: Record<EmployeeRole, string> = {
  manager: 'Manager',
  team_leader: 'Chef d\'équipe',
  developer: 'Développeur',
  designer: 'Designer',
  analyst: 'Analyste',
  support: 'Support',
  hr: 'Ressources Humaines',
  finance: 'Finance'
};

export const EMPLOYEE_ROLE_COLORS: Record<EmployeeRole, string> = {
  manager: 'bg-purple-100 text-purple-700',
  team_leader: 'bg-indigo-100 text-indigo-700',
  developer: 'bg-blue-100 text-blue-700',
  designer: 'bg-pink-100 text-pink-700',
  analyst: 'bg-green-100 text-green-700',
  support: 'bg-orange-100 text-orange-700',
  hr: 'bg-indigo-100 text-indigo-700',
  finance: 'bg-yellow-100 text-yellow-700'
};

export const EMPLOYEE_STATUS_LABELS: Record<EmployeeStatus, string> = {
  active: 'Actif',
  inactive: 'Inactif',
  on_leave: 'En congé',
  terminated: 'Licencié'
};

export const EMPLOYEE_STATUS_COLORS: Record<EmployeeStatus, string> = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-700',
  on_leave: 'bg-yellow-100 text-yellow-700',
  terminated: 'bg-red-100 text-red-700'
};

export const CONTRACT_TYPE_LABELS: Record<ContractType, string> = {
  full_time: 'Temps plein',
  part_time: 'Temps partiel',
  contract: 'Contractuel',
  intern: 'Stagiaire'
};

export const CONTRACT_TYPE_COLORS: Record<ContractType, string> = {
  full_time: 'bg-blue-100 text-blue-700',
  part_time: 'bg-green-100 text-green-700',
  contract: 'bg-orange-100 text-orange-700',
  intern: 'bg-purple-100 text-purple-700'
};

export const DEPARTMENTS = [
  'Développement',
  'Design',
  'Marketing',
  'Ventes',
  'Support Client',
  'Ressources Humaines',
  'Finance',
  'Direction'
] as const;

export const EMPLOYEE_ROLES: EmployeeRole[] = [
  'manager',
  'team_leader',
  'developer',
  'designer',
  'analyst',
  'support',
  'hr',
  'finance'
];