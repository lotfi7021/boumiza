import { useState, useEffect } from 'react';
import { ClientProject, ClientProjectFormData, ProjectAssignmentData, ClientProjectStatus } from '../types/clientProject';
import { clientProjectService } from '../services/clientProjectService';
import { useError } from './useError';

// ============================================
// FAKE DATA - À SUPPRIMER PLUS TARD
// ============================================
const FAKE_PROJECTS: ClientProject[] = [
  {
    id: '1',
    title: 'Développement Site E-commerce',
    description: 'Création d\'une plateforme e-commerce complète avec système de paiement intégré, gestion des stocks et interface d\'administration.',
    type: 'web_development',
    status: 'submitted',
    priority: 'high',
    clientId: 'client-1',
    clientName: 'Marie Dubois',
    clientEmail: 'marie.dubois@example.com',
    clientPhone: '+33 6 12 34 56 78',
    clientCompany: 'Fashion Store Paris',
    budget: 15000,
    deadline: '2026-06-30',
    submittedAt: '2026-04-20',
    createdAt: '2026-04-20',
    updatedAt: '2026-04-20',
    requirements: ['Site responsive', 'paiement sécurisé', 'gestion multi-devises'],
    attachments: [
      {
        id: 'att-1',
        fileName: 'Cahier_des_charges_ecommerce.pdf',
        fileUrl: '/uploads/cahier_charges_1.pdf',
        fileSize: 2456789,
        uploadedBy: 'client-1',
        uploadedAt: '2026-04-20',
        type: 'document'
      },
      {
        id: 'att-2',
        fileName: 'Maquettes_design.zip',
        fileUrl: '/uploads/maquettes_1.zip',
        fileSize: 5678901,
        uploadedBy: 'client-1',
        uploadedAt: '2026-04-20',
        type: 'other'
      }
    ],
  },
  {
    id: '2',
    title: 'Application Mobile de Livraison',
    description: 'Application mobile iOS et Android pour service de livraison de repas avec géolocalisation en temps réel.',
    type: 'mobile_app',
    status: 'under_review',
    priority: 'urgent',
    clientId: 'client-2',
    clientName: 'Jean Martin',
    clientEmail: 'jean.martin@example.com',
    clientPhone: '+33 6 98 76 54 32',
    clientCompany: 'FastFood Delivery',
    budget: 25000,
    deadline: '2026-07-15',
    submittedAt: '2026-04-18',
    createdAt: '2026-04-18',
    updatedAt: '2026-04-18',
    requirements: ['GPS tracking', 'notifications push', 'paiement intégré'],
    attachments: [
      {
        id: 'att-3',
        fileName: 'Specifications_app_mobile.pdf',
        fileUrl: '/uploads/specs_mobile.pdf',
        fileSize: 3456789,
        uploadedBy: 'client-2',
        uploadedAt: '2026-04-18',
        type: 'document'
      }
    ],
  },
  {
    id: '3',
    title: 'Refonte Interface CRM',
    description: 'Modernisation de l\'interface utilisateur du CRM existant avec amélioration de l\'UX et ajout de nouvelles fonctionnalités.',
    type: 'design',
    status: 'approved',
    priority: 'medium',
    clientId: 'client-3',
    clientName: 'Sophie Laurent',
    clientEmail: 'sophie.laurent@example.com',
    clientPhone: '+33 6 45 67 89 01',
    clientCompany: 'TechSolutions SA',
    budget: 8000,
    deadline: '2026-08-01',
    submittedAt: '2026-04-15',
    createdAt: '2026-04-15',
    updatedAt: '2026-04-22',
    requirements: ['Design moderne', 'responsive', 'accessibilité WCAG'],
    attachments: [
      {
        id: 'att-4',
        fileName: 'Brief_refonte_CRM.docx',
        fileUrl: '/uploads/brief_crm.docx',
        fileSize: 1234567,
        uploadedBy: 'client-3',
        uploadedAt: '2026-04-15',
        type: 'document'
      }
    ],
  },
  {
    id: '4',
    title: 'Système de Gestion Documentaire',
    description: 'Développement d\'un système de gestion électronique de documents avec workflow de validation et archivage automatique.',
    type: 'other',
    status: 'in_progress',
    priority: 'high',
    clientId: 'client-4',
    clientName: 'Pierre Durand',
    clientEmail: 'pierre.durand@example.com',
    clientPhone: '+33 6 23 45 67 89',
    clientCompany: 'Cabinet Juridique Associés',
    budget: 30000,
    deadline: '2026-09-30',
    submittedAt: '2026-04-10',
    startedAt: '2026-04-15',
    createdAt: '2026-04-10',
    updatedAt: '2026-04-15',
    progress: 35,
    assignedTeamId: 'team-1',
    requirements: ['Sécurité renforcée', 'signature électronique', 'backup automatique'],
    attachments: [
      {
        id: 'att-5',
        fileName: 'Cahier_charges_GED.pdf',
        fileUrl: '/uploads/cahier_ged.pdf',
        fileSize: 4567890,
        uploadedBy: 'client-4',
        uploadedAt: '2026-04-10',
        type: 'document'
      },
      {
        id: 'att-6',
        fileName: 'Workflow_validation.pdf',
        fileUrl: '/uploads/workflow.pdf',
        fileSize: 987654,
        uploadedBy: 'client-4',
        uploadedAt: '2026-04-10',
        type: 'document'
      }
    ],
  },
  {
    id: '5',
    title: 'Site Vitrine Entreprise',
    description: 'Création d\'un site vitrine moderne avec présentation des services, blog et formulaire de contact.',
    type: 'web_development',
    status: 'completed',
    priority: 'low',
    clientId: 'client-5',
    clientName: 'Isabelle Petit',
    clientEmail: 'isabelle.petit@example.com',
    clientPhone: '+33 6 78 90 12 34',
    clientCompany: 'Consulting & Partners',
    budget: 5000,
    deadline: '2026-05-15',
    submittedAt: '2026-03-20',
    startedAt: '2026-03-25',
    createdAt: '2026-03-20',
    updatedAt: '2026-04-25',
    progress: 100,
    assignedTeamId: 'team-2',
    requirements: ['SEO optimisé', 'multilingue (FR/EN)'],
    clientFeedback: 'Excellent travail, très satisfait du résultat!',
    attachments: [
      {
        id: 'att-7',
        fileName: 'Brief_site_vitrine.pdf',
        fileUrl: '/uploads/brief_vitrine.pdf',
        fileSize: 876543,
        uploadedBy: 'client-5',
        uploadedAt: '2026-03-20',
        type: 'document'
      }
    ],
  },
  {
    id: '6',
    title: 'Plateforme de Formation en Ligne',
    description: 'Développement d\'une plateforme LMS complète avec gestion des cours, quiz, certificats et suivi des apprenants.',
    type: 'web_development',
    status: 'submitted',
    priority: 'medium',
    clientId: 'client-6',
    clientName: 'Thomas Bernard',
    clientEmail: 'thomas.bernard@example.com',
    clientPhone: '+33 6 34 56 78 90',
    clientCompany: 'EduTech Academy',
    budget: 20000,
    deadline: '2026-10-01',
    submittedAt: '2026-04-25',
    createdAt: '2026-04-25',
    updatedAt: '2026-04-25',
    requirements: ['Vidéos HD', 'quiz interactifs', 'certificats PDF'],
    attachments: [
      {
        id: 'att-8',
        fileName: 'Specifications_plateforme_LMS.pdf',
        fileUrl: '/uploads/specs_lms.pdf',
        fileSize: 3456789,
        uploadedBy: 'client-6',
        uploadedAt: '2026-04-25',
        type: 'document'
      }
    ],
  },
  {
    id: '7',
    title: 'Application de Gestion de Projet',
    description: 'Outil de gestion de projet collaboratif avec tableaux Kanban, diagrammes de Gantt et reporting avancé.',
    type: 'other',
    status: 'rejected',
    priority: 'high',
    clientId: 'client-7',
    clientName: 'Nathalie Rousseau',
    clientEmail: 'nathalie.rousseau@example.com',
    clientPhone: '+33 6 56 78 90 12',
    clientCompany: 'Project Masters',
    budget: 18000,
    deadline: '2026-08-15',
    submittedAt: '2026-04-12',
    createdAt: '2026-04-12',
    updatedAt: '2026-04-20',
    rejectionReason: 'Budget insuffisant pour le scope demandé. Nécessite au moins 25000€.',
    requirements: ['Intégration Slack', 'API REST', 'exports Excel'],
    attachments: [
      {
        id: 'att-9',
        fileName: 'Cahier_charges_gestion_projet.pdf',
        fileUrl: '/uploads/cahier_gestion.pdf',
        fileSize: 2345678,
        uploadedBy: 'client-7',
        uploadedAt: '2026-04-12',
        type: 'document'
      }
    ],
  },
  {
    id: '8',
    title: 'Refonte Logo et Charte Graphique',
    description: 'Création d\'une nouvelle identité visuelle complète incluant logo, charte graphique et supports de communication.',
    type: 'design',
    status: 'in_progress',
    priority: 'medium',
    clientId: 'client-8',
    clientName: 'Olivier Moreau',
    clientEmail: 'olivier.moreau@example.com',
    clientPhone: '+33 6 67 89 01 23',
    clientCompany: 'Green Energy Solutions',
    budget: 6000,
    deadline: '2026-06-15',
    submittedAt: '2026-04-08',
    startedAt: '2026-04-12',
    createdAt: '2026-04-08',
    updatedAt: '2026-04-12',
    progress: 60,
    assignedTeamId: 'team-3',
    requirements: ['Style moderne et écologique', 'déclinaisons print et web'],
    attachments: [
      {
        id: 'att-10',
        fileName: 'Brief_identite_visuelle.pdf',
        fileUrl: '/uploads/brief_identite.pdf',
        fileSize: 1567890,
        uploadedBy: 'client-8',
        uploadedAt: '2026-04-08',
        type: 'document'
      }
    ],
  },
];
// ============================================
// FIN FAKE DATA
// ============================================

export const useClientProjects = () => {
  // FAKE DATA: Initialiser avec les données de test
  const [projects, setProjects] = useState<ClientProject[]>(FAKE_PROJECTS);
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState<any>(null);
  const { handleError } = useError();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      // FAKE DATA: Commenter l'appel API et utiliser les données de test
      // const data = await clientProjectService.getAll();
      // setProjects(data);
      
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 500));
      setProjects(FAKE_PROJECTS);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectsByStatus = async (status: ClientProjectStatus) => {
    setLoading(true);
    try {
      // FAKE DATA: Commenter l'appel API et filtrer les données de test
      // const data = await clientProjectService.getByStatus(status);
      // setProjects(data);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      const filtered = FAKE_PROJECTS.filter(p => p.status === status);
      setProjects(filtered);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (data: ClientProjectFormData): Promise<boolean> => {
    try {
      const newProject = await clientProjectService.create(data);
      setProjects(prev => [newProject, ...prev]);
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const updateProject = async (id: string, data: Partial<ClientProjectFormData>): Promise<boolean> => {
    try {
      const updatedProject = await clientProjectService.update(id, data);
      setProjects(prev => prev.map(project => 
        project.id === id ? updatedProject : project
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const updateProjectStatus = async (id: string, status: ClientProjectStatus, notes?: string): Promise<boolean> => {
    try {
      // FAKE DATA: Mettre à jour directement l'état local sans appel API
      // const updatedProject = await clientProjectService.updateStatus(id, status, notes);
      
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mettre à jour le projet dans l'état local
      setProjects(prev => prev.map(project => 
        project.id === id ? { ...project, status, updatedAt: new Date().toISOString() } : project
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const assignProject = async (id: string, assignmentData: ProjectAssignmentData): Promise<boolean> => {
    try {
      // FAKE DATA: Mettre à jour directement l'état local sans appel API
      // const updatedProject = await clientProjectService.assignProject(id, assignmentData);
      
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mettre à jour le projet dans l'état local
      setProjects(prev => prev.map(project => 
        project.id === id ? { 
          ...project, 
          assignedTeamId: assignmentData.assignedTeamId,
          assignedManagerId: assignmentData.assignedManagerId,
          assignedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } : project
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    try {
      // FAKE DATA: Supprimer directement de l'état local sans appel API
      // await clientProjectService.delete(id);
      
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Supprimer le projet de l'état local
      setProjects(prev => prev.filter(project => project.id !== id));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    statistics,
    fetchProjects,
    fetchProjectsByStatus,
    createProject,
    updateProject,
    updateProjectStatus,
    assignProject,
    deleteProject,
  };
};
