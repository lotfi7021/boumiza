export type ComplaintType = 'client' | 'employee';
export type ComplaintStatus = 'pending' | 'in_progress' | 'resolved' | 'rejected';
export type ComplaintPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ComplaintCategory = 
  // Catégories clients
  | 'service_quality' | 'billing' | 'technical_issue' | 'delivery' | 'product_defect' | 'other_client'
  // Catégories employés
  | 'workplace_harassment' | 'salary_issue' | 'working_conditions' | 'discrimination' | 'management_issue' | 'other_employee';

export interface Complaint {
  id: string;
  type: ComplaintType;
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  
  // Informations du plaignant
  complainantId: string;
  complainantName: string;
  complainantEmail: string;
  complainantPhone?: string;
  
  // Gestion administrative
  assignedTo?: string; // ID de l'admin assigné
  assignedToName?: string;
  
  // Dates
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  
  // Suivi
  comments: ComplaintComment[];
  attachments: ComplaintAttachment[];
  
  // Résolution
  resolution?: string;
  resolutionNotes?: string;
}

export interface ComplaintComment {
  id: string;
  complaintId: string;
  authorId: string;
  authorName: string;
  authorRole: 'admin' | 'complainant';
  content: string;
  createdAt: string;
  isInternal: boolean; // Visible seulement par les admins
}

export interface ComplaintAttachment {
  id: string;
  complaintId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: string;
}

export interface ComplaintFormData {
  type: ComplaintType;
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  complainantId: string;
  complainantName: string;
  complainantEmail: string;
  complainantPhone?: string;
}

export const COMPLAINT_STATUS_LABELS: Record<ComplaintStatus, string> = {
  pending: 'En attente',
  in_progress: 'En cours',
  resolved: 'Résolue',
  rejected: 'Rejetée'
};

export const COMPLAINT_STATUS_COLORS: Record<ComplaintStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  in_progress: 'bg-blue-100 text-blue-700',
  resolved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700'
};

export const COMPLAINT_PRIORITY_LABELS: Record<ComplaintPriority, string> = {
  low: 'Faible',
  medium: 'Moyenne',
  high: 'Élevée',
  urgent: 'Urgente'
};

export const COMPLAINT_PRIORITY_COLORS: Record<ComplaintPriority, string> = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700'
};

export const CLIENT_COMPLAINT_CATEGORIES: Record<string, string> = {
  service_quality: 'Qualité de service',
  billing: 'Facturation',
  technical_issue: 'Problème technique',
  delivery: 'Livraison',
  product_defect: 'Défaut produit',
  other_client: 'Autre'
};

export const EMPLOYEE_COMPLAINT_CATEGORIES: Record<string, string> = {
  workplace_harassment: 'Harcèlement au travail',
  salary_issue: 'Problème de salaire',
  working_conditions: 'Conditions de travail',
  discrimination: 'Discrimination',
  management_issue: 'Problème de management',
  other_employee: 'Autre'
};

export const ALL_COMPLAINT_CATEGORIES = {
  ...CLIENT_COMPLAINT_CATEGORIES,
  ...EMPLOYEE_COMPLAINT_CATEGORIES
};