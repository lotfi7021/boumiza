import { useState, useEffect } from 'react';
import { Complaint, ComplaintFormData, ComplaintComment, ComplaintType, ComplaintStatus } from '../types/complaint';
import { complaintService } from '../services/complaintService';
import { useError } from './useError';

// ============================================
// FAKE DATA - À SUPPRIMER PLUS TARD
// ============================================
const FAKE_COMPLAINTS: Complaint[] = [
  // Réclamations CLIENTS
  {
    id: 'comp-1',
    type: 'client',
    title: 'Retard de livraison important',
    description: 'Ma commande devait arriver il y a 2 semaines. Aucune nouvelle depuis. J\'ai besoin de ce produit de toute urgence pour mon entreprise.',
    category: 'delivery',
    priority: 'urgent',
    status: 'in_progress',
    complainantId: 'client-1',
    complainantName: 'Marie Dubois',
    complainantEmail: 'marie.dubois@example.com',
    complainantPhone: '+33 6 12 34 56 78',
    assignedTo: 'admin-1',
    assignedToName: 'Sophie Laurent',
    createdAt: '2026-04-20T10:30:00Z',
    updatedAt: '2026-04-22T14:20:00Z',
    comments: [],
    attachments: []
  },
  {
    id: 'comp-2',
    type: 'client',
    title: 'Facturation incorrecte',
    description: 'J\'ai été facturé deux fois pour le même service. Le montant de 1500€ a été débité deux fois de mon compte.',
    category: 'billing',
    priority: 'high',
    status: 'pending',
    complainantId: 'client-2',
    complainantName: 'Jean Martin',
    complainantEmail: 'jean.martin@example.com',
    complainantPhone: '+33 6 98 76 54 32',
    createdAt: '2026-04-25T09:15:00Z',
    updatedAt: '2026-04-25T09:15:00Z',
    comments: [],
    attachments: []
  },
  {
    id: 'comp-3',
    type: 'client',
    title: 'Produit défectueux reçu',
    description: 'Le produit reçu ne fonctionne pas correctement. L\'écran est fissuré et l\'appareil ne s\'allume pas.',
    category: 'product_defect',
    priority: 'high',
    status: 'resolved',
    complainantId: 'client-3',
    complainantName: 'Pierre Bernard',
    complainantEmail: 'pierre.bernard@example.com',
    complainantPhone: '+33 6 34 56 78 90',
    assignedTo: 'admin-2',
    assignedToName: 'Thomas Petit',
    createdAt: '2026-04-15T14:00:00Z',
    updatedAt: '2026-04-23T16:30:00Z',
    resolvedAt: '2026-04-23T16:30:00Z',
    resolution: 'Produit remplacé et expédié. Numéro de suivi: FR123456789',
    resolutionNotes: 'Client satisfait du remplacement rapide',
    comments: [],
    attachments: []
  },

  {
    id: 'comp-6',
    type: 'client',
    title: 'Remboursement non reçu',
    description: 'J\'ai annulé ma commande il y a 3 semaines mais je n\'ai toujours pas reçu mon remboursement de 850€.',
    category: 'billing',
    priority: 'urgent',
    status: 'rejected',
    complainantId: 'client-6',
    complainantName: 'Julie Moreau',
    complainantEmail: 'julie.moreau@example.com',
    createdAt: '2026-04-18T15:20:00Z',
    updatedAt: '2026-04-21T09:00:00Z',
    resolution: 'Demande rejetée - Délai de remboursement standard de 30 jours non dépassé',
    comments: [],
    attachments: []
  },

  // Réclamations EMPLOYÉS

  {
    id: 'comp-8',
    type: 'employee',
    title: 'Harcèlement moral de la part du manager',
    description: 'Mon manager me fait des remarques déplacées quotidiennement et me met une pression excessive. Cela affecte ma santé mentale.',
    category: 'workplace_harassment',
    priority: 'urgent',
    status: 'in_progress',
    complainantId: 'emp-5',
    complainantName: 'Thomas Petit',
    complainantEmail: 'thomas.petit@company.com',
    assignedTo: 'admin-3',
    assignedToName: 'Camille Girard',
    createdAt: '2026-04-24T16:45:00Z',
    updatedAt: '2026-04-26T11:00:00Z',
    comments: [],
    attachments: []
  },
  {
    id: 'comp-9',
    type: 'employee',
    title: 'Conditions de travail dangereuses',
    description: 'Les équipements de sécurité ne sont pas fournis et l\'atelier n\'est pas aux normes. Risque d\'accident.',
    category: 'working_conditions',
    priority: 'urgent',
    status: 'pending',
    complainantId: 'emp-7',
    complainantName: 'Luc Rousseau',
    complainantEmail: 'luc.rousseau@company.com',
    complainantPhone: '+33 6 78 90 12 34',
    createdAt: '2026-04-26T10:15:00Z',
    updatedAt: '2026-04-26T10:15:00Z',
    comments: [],
    attachments: []
  },
  {
    id: 'comp-10',
    type: 'employee',
    title: 'Discrimination à l\'embauche',
    description: 'J\'ai été refusé pour une promotion alors que j\'ai les compétences requises. Je pense que c\'est lié à mon origine.',
    category: 'discrimination',
    priority: 'high',
    status: 'resolved',
    complainantId: 'emp-8',
    complainantName: 'Emma Dubois',
    complainantEmail: 'emma.dubois@company.com',
    assignedTo: 'admin-3',
    assignedToName: 'Camille Girard',
    createdAt: '2026-04-10T13:30:00Z',
    updatedAt: '2026-04-20T15:45:00Z',
    resolvedAt: '2026-04-20T15:45:00Z',
    resolution: 'Enquête menée. Promotion accordée avec effet rétroactif.',
    resolutionNotes: 'Formation anti-discrimination organisée pour les managers',
    comments: [],
    attachments: []
  },
  {
    id: 'comp-11',
    type: 'employee',
    title: 'Manque de communication du management',
    description: 'Les décisions importantes sont prises sans nous consulter. Aucune transparence sur les changements organisationnels.',
    category: 'management_issue',
    priority: 'medium',
    status: 'pending',
    complainantId: 'emp-3',
    complainantName: 'Pierre Bernard',
    complainantEmail: 'pierre.bernard@company.com',
    createdAt: '2026-04-25T14:00:00Z',
    updatedAt: '2026-04-25T14:00:00Z',
    comments: [],
    attachments: []
  },
  {
    id: 'comp-12',
    type: 'employee',
    title: 'Charge de travail excessive',
    description: 'On me demande de faire le travail de 3 personnes depuis le départ de mes collègues. Je suis en burn-out.',
    category: 'working_conditions',
    priority: 'high',
    status: 'in_progress',
    complainantId: 'emp-2',
    complainantName: 'Marie Martin',
    complainantEmail: 'marie.martin@company.com',
    assignedTo: 'admin-3',
    assignedToName: 'Camille Girard',
    createdAt: '2026-04-21T11:20:00Z',
    updatedAt: '2026-04-24T09:30:00Z',
    comments: [],
    attachments: []
  }
];
// ============================================
// FIN FAKE DATA
// ============================================

// Hook personnalisé pour la gestion des réclamations
export const useComplaints = () => {
  // FAKE DATA: Initialiser avec les données de test
  const [complaints, setComplaints] = useState<Complaint[]>(FAKE_COMPLAINTS);
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState<any>(null);
  const { handleError } = useError();

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      // FAKE DATA: Commenter l'appel API et utiliser les données de test
      // const data = await complaintService.getAll();
      // setComplaints(data);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setComplaints(FAKE_COMPLAINTS);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComplaintsByType = async (type: ComplaintType) => {
    setLoading(true);
    try {
      // FAKE DATA: Commenter l'appel API et filtrer les données de test
      // const data = await complaintService.getByType(type);
      // setComplaints(data);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      const filtered = FAKE_COMPLAINTS.filter(c => c.type === type);
      setComplaints(filtered);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComplaintsByStatus = async (status: ComplaintStatus) => {
    setLoading(true);
    try {
      // FAKE DATA: Commenter l'appel API et filtrer les données de test
      // const data = await complaintService.getByStatus(status);
      // setComplaints(data);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      const filtered = FAKE_COMPLAINTS.filter(c => c.status === status);
      setComplaints(filtered);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      // FAKE DATA: Pas d'appel API pour les statistiques
      // const data = await complaintService.getStatistics();
      // setStatistics(data);
      
      await new Promise(resolve => setTimeout(resolve, 200));
      // Calculer les statistiques à partir des données de test
      const stats = {
        total: FAKE_COMPLAINTS.length,
        pending: FAKE_COMPLAINTS.filter(c => c.status === 'pending').length,
        inProgress: FAKE_COMPLAINTS.filter(c => c.status === 'in_progress').length,
        resolved: FAKE_COMPLAINTS.filter(c => c.status === 'resolved').length,
        rejected: FAKE_COMPLAINTS.filter(c => c.status === 'rejected').length,
      };
      setStatistics(stats);
    } catch (error) {
      handleError(error as Error);
    }
  };

  const createComplaint = async (data: ComplaintFormData): Promise<boolean> => {
    try {
      // FAKE DATA: Créer directement dans l'état local sans appel API
      // const newComplaint = await complaintService.create(data);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      const newComplaint: Complaint = {
        id: `comp-${Date.now()}`,
        type: data.type,
        title: data.title,
        description: data.description,
        category: data.category,
        priority: data.priority,
        status: 'pending',
        complainantId: data.complainantId,
        complainantName: data.complainantName,
        complainantEmail: data.complainantEmail,
        complainantPhone: data.complainantPhone,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        comments: [],
        attachments: []
      };
      setComplaints(prev => [newComplaint, ...prev]);
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const updateComplaint = async (id: string, data: Partial<ComplaintFormData>): Promise<boolean> => {
    try {
      // FAKE DATA: Mettre à jour directement l'état local sans appel API
      // const updatedComplaint = await complaintService.update(id, data);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setComplaints(prev => prev.map(complaint => 
        complaint.id === id ? { ...complaint, ...data, updatedAt: new Date().toISOString() } : complaint
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const updateComplaintStatus = async (id: string, status: ComplaintStatus): Promise<boolean> => {
    try {
      // FAKE DATA: Mettre à jour directement l'état local sans appel API
      // const updatedComplaint = await complaintService.updateStatus(id, status);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setComplaints(prev => prev.map(complaint => 
        complaint.id === id ? { ...complaint, status, updatedAt: new Date().toISOString() } : complaint
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const assignComplaint = async (id: string, adminId: string): Promise<boolean> => {
    try {
      // FAKE DATA: Mettre à jour directement l'état local sans appel API
      // const updatedComplaint = await complaintService.assignTo(id, adminId);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setComplaints(prev => prev.map(complaint => 
        complaint.id === id ? { ...complaint, assignedTo: adminId, updatedAt: new Date().toISOString() } : complaint
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const resolveComplaint = async (id: string, resolution: string, resolutionNotes?: string): Promise<boolean> => {
    try {
      // FAKE DATA: Mettre à jour directement l'état local sans appel API
      // const updatedComplaint = await complaintService.resolve(id, resolution, resolutionNotes);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setComplaints(prev => prev.map(complaint => 
        complaint.id === id ? { 
          ...complaint, 
          status: 'resolved',
          resolution,
          resolutionNotes,
          resolvedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } : complaint
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const rejectComplaint = async (id: string, reason: string): Promise<boolean> => {
    try {
      // FAKE DATA: Mettre à jour directement l'état local sans appel API
      // const updatedComplaint = await complaintService.reject(id, reason);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setComplaints(prev => prev.map(complaint => 
        complaint.id === id ? { 
          ...complaint, 
          status: 'rejected',
          resolution: reason,
          updatedAt: new Date().toISOString()
        } : complaint
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const addComment = async (complaintId: string, content: string, isInternal: boolean = false): Promise<boolean> => {
    try {
      // FAKE DATA: Ajouter directement le commentaire sans appel API
      // await complaintService.addComment(complaintId, content, isInternal);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      const newComment: ComplaintComment = {
        id: `comment-${Date.now()}`,
        content,
        isInternal,
        createdAt: new Date().toISOString(),
        createdBy: 'admin-1',
        createdByName: 'Admin'
      };
      
      setComplaints(prev => prev.map(complaint => 
        complaint.id === complaintId ? { 
          ...complaint, 
          comments: [...(complaint.comments || []), newComment],
          updatedAt: new Date().toISOString()
        } : complaint
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const deleteComplaint = async (id: string): Promise<boolean> => {
    try {
      // FAKE DATA: Supprimer directement de l'état local sans appel API
      // await complaintService.delete(id);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setComplaints(prev => prev.filter(complaint => complaint.id !== id));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchStatistics();
  }, []);

  return {
    complaints,
    loading,
    statistics,
    fetchComplaints,
    fetchComplaintsByType,
    fetchComplaintsByStatus,
    createComplaint,
    updateComplaint,
    updateComplaintStatus,
    assignComplaint,
    resolveComplaint,
    rejectComplaint,
    addComment,
    deleteComplaint,
    refreshStatistics: fetchStatistics,
  };
};