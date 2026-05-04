export type TeamStatus = 'active' | 'inactive' | 'on_hold';

export interface Team {
  id: string;
  name: string;
  description: string;
  department: string;
  status: TeamStatus;
  
  // Chef d'équipe
  teamLeaderId?: string;
  teamLeaderName?: string;
  teamLeaderEmail?: string;
  
  // Membres de l'équipe
  members: TeamMember[];
  memberCount: number;
  
  // Dates
  createdAt: string;
  updatedAt: string;
  
  // Objectifs et projets
  objectives?: string[];
  currentProjects?: TeamProject[];
  
  // Métriques
  performance?: TeamPerformance;
}

export interface TeamMember {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  role: string;
  department: string;
  joinedAt: string;
  isActive: boolean;
}

export interface TeamProject {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  startDate: string;
  endDate?: string;
  assignedMembers: string[]; // IDs des membres assignés
}

export interface TeamPerformance {
  completedProjects: number;
  ongoingProjects: number;
  averageTaskCompletion: number;
  teamSatisfaction: number;
  lastUpdated: string;
}

export interface TeamFormData {
  name: string;
  description: string;
  department: string;
  status: TeamStatus;
  teamLeaderId?: string;
  objectives?: string[];
}

export const TEAM_STATUS_LABELS: Record<TeamStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  on_hold: 'En pause'
};

export const TEAM_STATUS_COLORS: Record<TeamStatus, string> = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-700',
  on_hold: 'bg-yellow-100 text-yellow-700'
};

export const PROJECT_STATUS_LABELS = {
  planning: 'Planification',
  in_progress: 'En cours',
  completed: 'Terminé',
  on_hold: 'En pause'
};

export const PROJECT_STATUS_COLORS = {
  planning: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-orange-100 text-orange-700',
  completed: 'bg-green-100 text-green-700',
  on_hold: 'bg-yellow-100 text-yellow-700'
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