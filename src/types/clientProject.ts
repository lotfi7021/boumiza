export type ClientProjectStatus = 'submitted' | 'under_review' | 'approved' | 'in_progress' | 'completed' | 'rejected' | 'on_hold';
export type ProjectPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ProjectType = 'web_development' | 'mobile_app' | 'design' | 'marketing' | 'consulting' | 'maintenance' | 'other';

export interface ClientProject {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  status: ClientProjectStatus;
  priority: ProjectPriority;
  
  // Client information
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientCompany?: string;
  
  // Project details
  budget?: number;
  estimatedDuration?: number; // en jours
  deadline?: string;
  requirements: string[];
  attachments?: ProjectAttachment[];
  
  // Assignment (passation)
  assignedTeamId?: string;
  assignedTeamName?: string;
  assignedManagerId?: string;
  assignedManagerName?: string;
  assignedAt?: string;
  assignedBy?: string; // Admin qui a fait la passation
  
  // Dates
  submittedAt: string;
  reviewedAt?: string;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  
  // Notes and communication
  adminNotes?: string;
  clientFeedback?: string;
  rejectionReason?: string;
  
  // Progress tracking
  progress?: number; // 0-100
  milestones?: ProjectMilestone[];
}

export interface ProjectAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: string;
  type: 'document' | 'image' | 'video' | 'other';
}

export interface ProjectMilestone {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  completedDate?: string;
  status: 'pending' | 'completed' | 'overdue';
}

export interface ClientProjectFormData {
  title: string;
  description: string;
  type: ProjectType;
  priority: ProjectPriority;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientCompany?: string;
  budget?: number;
  estimatedDuration?: number;
  deadline?: string;
  requirements: string[];
}

export interface ProjectAssignmentData {
  assignedTeamId?: string;
  assignedManagerId?: string;
  adminNotes?: string;
  priority?: ProjectPriority;
}

export const CLIENT_PROJECT_STATUS_LABELS: Record<ClientProjectStatus, string> = {
  submitted: 'Soumis',
  under_review: 'En révision',
  approved: 'Approuvé',
  in_progress: 'En cours',
  completed: 'Terminé',
  rejected: 'Rejeté',
  on_hold: 'En pause'
};

export const CLIENT_PROJECT_STATUS_COLORS: Record<ClientProjectStatus, string> = {
  submitted: 'bg-blue-100 text-blue-700',
  under_review: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  in_progress: 'bg-orange-100 text-orange-700',
  completed: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
  on_hold: 'bg-gray-100 text-gray-700'
};

export const PROJECT_PRIORITY_LABELS: Record<ProjectPriority, string> = {
  low: 'Faible',
  medium: 'Moyenne',
  high: 'Élevée',
  urgent: 'Urgente'
};

export const PROJECT_PRIORITY_COLORS: Record<ProjectPriority, string> = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700'
};

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  web_development: 'Développement Web',
  mobile_app: 'Application Mobile',
  design: 'Design',
  marketing: 'Marketing',
  consulting: 'Conseil',
  maintenance: 'Maintenance',
  other: 'Autre'
};

export const PROJECT_TYPE_COLORS: Record<ProjectType, string> = {
  web_development: 'bg-blue-100 text-blue-700',
  mobile_app: 'bg-green-100 text-green-700',
  design: 'bg-pink-100 text-pink-700',
  marketing: 'bg-purple-100 text-purple-700',
  consulting: 'bg-yellow-100 text-yellow-700',
  maintenance: 'bg-orange-100 text-orange-700',
  other: 'bg-gray-100 text-gray-700'
};