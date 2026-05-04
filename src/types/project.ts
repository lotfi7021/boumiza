export type ProjectStatus = 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
export type ProjectPriority = 'low' | 'medium' | 'high' | 'critical';
export type ProjectType = 'development' | 'design' | 'marketing' | 'research' | 'maintenance' | 'other';

export interface Project {
  id: string;
  name: string;
  description: string;
  type: ProjectType;
  status: ProjectStatus;
  priority: ProjectPriority;
  
  // Gestion
  projectManagerId?: string;
  projectManagerName?: string;
  projectManagerEmail?: string;
  
  // Équipe
  teamId?: string;
  teamName?: string;
  assignedMembers: ProjectMember[];
  
  // Dates et budget
  startDate: string;
  endDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  budget?: number;
  spentBudget?: number;
  
  // Progression
  progress: number; // 0-100
  milestones: ProjectMilestone[];
  tasks: ProjectTask[];
  
  // Métadonnées
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  
  // Client/Département
  clientId?: string;
  clientName?: string;
  department: string;
  
  // Documents et ressources
  attachments?: ProjectAttachment[];
  notes?: string;
}

export interface ProjectMember {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  role: string;
  joinedAt: string;
  hoursAllocated?: number;
  hoursWorked?: number;
  isActive: boolean;
}

export interface ProjectMilestone {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  completedDate?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  assignedTo?: string[];
}

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  priority: ProjectPriority;
  assignedTo?: string;
  assignedToName?: string;
  estimatedHours?: number;
  actualHours?: number;
  dueDate?: string;
  completedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedBy: string;
  uploadedByName: string;
  uploadedAt: string;
  type: 'document' | 'image' | 'video' | 'other';
}

export interface ProjectFormData {
  name: string;
  description: string;
  type: ProjectType;
  status: ProjectStatus;
  priority: ProjectPriority;
  projectManagerId?: string;
  teamId?: string;
  startDate: string;
  endDate?: string;
  estimatedHours?: number;
  budget?: number;
  clientId?: string;
  department: string;
  notes?: string;
}

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  planning: 'Planification',
  in_progress: 'En cours',
  on_hold: 'En pause',
  completed: 'Terminé',
  cancelled: 'Annulé'
};

export const PROJECT_STATUS_COLORS: Record<ProjectStatus, string> = {
  planning: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-orange-100 text-orange-700',
  on_hold: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700'
};

export const PROJECT_PRIORITY_LABELS: Record<ProjectPriority, string> = {
  low: 'Faible',
  medium: 'Moyenne',
  high: 'Élevée',
  critical: 'Critique'
};

export const PROJECT_PRIORITY_COLORS: Record<ProjectPriority, string> = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-orange-100 text-orange-700',
  critical: 'bg-red-100 text-red-700'
};

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  development: 'Développement',
  design: 'Design',
  marketing: 'Marketing',
  research: 'Recherche',
  maintenance: 'Maintenance',
  other: 'Autre'
};

export const PROJECT_TYPE_COLORS: Record<ProjectType, string> = {
  development: 'bg-blue-100 text-blue-700',
  design: 'bg-pink-100 text-pink-700',
  marketing: 'bg-green-100 text-green-700',
  research: 'bg-purple-100 text-purple-700',
  maintenance: 'bg-yellow-100 text-yellow-700',
  other: 'bg-gray-100 text-gray-700'
};