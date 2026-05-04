import { useState } from 'react';
import { Plus, Search, Filter, AlertCircle, User, Shield, Eye, X } from 'lucide-react';

interface Complaint {
  id: string;
  type: 'employee_to_admin' | 'employee_to_employee' | 'admin';
  title: string;
  description: string;
  submittedBy: string;
  submittedByEmail: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  resolvedAt?: string;
}

export default function ChefProjetComplaints() {
  const [activeTab, setActiveTab] = useState<'admin' | 'employee'>('admin');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [newComplaint, setNewComplaint] = useState({
    type: 'employee_to_admin' as 'employee_to_admin' | 'employee_to_employee' | 'admin',
    title: '',
    description: '',
    category: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent'
  });

  // FAKE DATA
  const [complaints, setComplaints] = useState<Complaint[]>([
    // Réclamations Employés vers Admin
    {
      id: '1',
      type: 'employee_to_admin',
      title: 'Problème de matériel informatique',
      description: 'Mon ordinateur portable est très lent et plante régulièrement',
      submittedBy: 'Marie Dubois',
      submittedByEmail: 'marie.dubois@company.com',
      category: 'Matériel',
      priority: 'high',
      status: 'in_progress',
      createdAt: '2026-04-25T10:30:00'
    },
    {
      id: '2',
      type: 'employee_to_admin',
      title: 'Demande de formation',
      description: 'Je souhaiterais suivre une formation sur React avancé',
      submittedBy: 'Jean Martin',
      submittedByEmail: 'jean.martin@company.com',
      category: 'Formation',
      priority: 'medium',
      status: 'pending',
      createdAt: '2026-04-26T14:20:00'
    },
    {
      id: '3',
      type: 'employee_to_admin',
      title: 'Problème d\'accès VPN',
      description: 'Impossible de me connecter au VPN depuis hier',
      submittedBy: 'Sophie Laurent',
      submittedByEmail: 'sophie.laurent@company.com',
      category: 'Technique',
      priority: 'urgent',
      status: 'pending',
      createdAt: '2026-04-28T09:15:00'
    },
    {
      id: '4',
      type: 'employee_to_admin',
      title: 'Demande de congés',
      description: 'Demande de validation pour congés du 15 au 20 mai',
      submittedBy: 'Pierre Durand',
      submittedByEmail: 'pierre.durand@company.com',
      category: 'RH',
      priority: 'medium',
      status: 'resolved',
      createdAt: '2026-04-20T11:00:00',
      resolvedAt: '2026-04-22T15:30:00'
    },

    // Réclamations entre Employés
    {
      id: '5',
      type: 'employee_to_employee',
      title: 'Conflit sur la répartition des tâches',
      description: 'Désaccord avec un collègue sur la distribution du travail',
      submittedBy: 'Luc Bernard',
      submittedByEmail: 'luc.bernard@company.com',
      category: 'Collaboration',
      priority: 'medium',
      status: 'in_progress',
      createdAt: '2026-04-24T16:45:00'
    },
    {
      id: '6',
      type: 'employee_to_employee',
      title: 'Problème de communication',
      description: 'Manque de communication dans l\'équipe projet',
      submittedBy: 'Emma Petit',
      submittedByEmail: 'emma.petit@company.com',
      category: 'Communication',
      priority: 'low',
      status: 'pending',
      createdAt: '2026-04-27T13:20:00'
    },
    {
      id: '11',
      type: 'employee_to_employee',
      title: 'Retard dans les livrables',
      description: 'Un collègue ne respecte pas les délais convenus',
      submittedBy: 'Thomas Roux',
      submittedByEmail: 'thomas.roux@company.com',
      category: 'Délais',
      priority: 'high',
      status: 'pending',
      createdAt: '2026-04-29T10:00:00'
    },

    // Réclamations Admins
    {
      id: '7',
      type: 'admin',
      title: 'Besoin de ressources supplémentaires',
      description: 'Le projet nécessite 2 développeurs supplémentaires',
      submittedBy: 'Admin Tech',
      submittedByEmail: 'admin.tech@company.com',
      category: 'Ressources',
      priority: 'high',
      status: 'in_progress',
      createdAt: '2026-04-26T10:00:00'
    },
    {
      id: '8',
      type: 'admin',
      title: 'Problème de budget projet',
      description: 'Dépassement budgétaire prévu sur le projet E-commerce',
      submittedBy: 'Admin Finance',
      submittedByEmail: 'admin.finance@company.com',
      category: 'Budget',
      priority: 'urgent',
      status: 'pending',
      createdAt: '2026-04-28T08:30:00'
    },
    {
      id: '9',
      type: 'admin',
      title: 'Demande d\'accès système',
      description: 'Besoin d\'accès administrateur pour le nouveau serveur',
      submittedBy: 'Admin IT',
      submittedByEmail: 'admin.it@company.com',
      category: 'Technique',
      priority: 'medium',
      status: 'resolved',
      createdAt: '2026-04-23T14:15:00',
      resolvedAt: '2026-04-24T10:00:00'
    },
    {
      id: '10',
      type: 'admin',
      title: 'Conflit d\'équipe',
      description: 'Tensions entre deux membres de l\'équipe développement',
      submittedBy: 'Admin RH',
      submittedByEmail: 'admin.rh@company.com',
      category: 'RH',
      priority: 'high',
      status: 'in_progress',
      createdAt: '2026-04-25T11:30:00'
    }
  ]);

  // Filtrer par onglet actif
  const complaintsByTab = complaints.filter(c => {
    if (activeTab === 'admin') {
      return c.type === 'employee_to_admin' || c.type === 'admin';
    } else {
      return c.type === 'employee_to_employee';
    }
  });

  // Appliquer les filtres
  const filteredComplaints = complaintsByTab.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || complaint.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: complaintsByTab.length,
    pending: complaintsByTab.filter(c => c.status === 'pending').length,
    inProgress: complaintsByTab.filter(c => c.status === 'in_progress').length,
    resolved: complaintsByTab.filter(c => c.status === 'resolved').length
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'En attente',
      in_progress: 'En cours',
      resolved: 'Résolu',
      closed: 'Fermé'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      in_progress: 'bg-blue-100 text-blue-700',
      resolved: 'bg-green-100 text-green-700',
      closed: 'bg-gray-100 text-gray-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityLabel = (priority: string) => {
    const labels: Record<string, string> = {
      low: 'Faible',
      medium: 'Moyenne',
      high: 'Haute',
      urgent: 'Urgente'
    };
    return labels[priority] || priority;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-blue-100 text-blue-700',
      high: 'bg-orange-100 text-orange-700',
      urgent: 'bg-red-100 text-red-700'
    };
    return colors[priority] || 'bg-gray-100 text-gray-700';
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      employee_to_admin: 'Employé → Admin',
      employee_to_employee: 'Employé → Employé',
      admin: 'Administrateur'
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      employee_to_admin: 'bg-blue-100 text-blue-700',
      employee_to_employee: 'bg-green-100 text-green-700',
      admin: 'bg-purple-100 text-purple-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const handleCreateComplaint = () => {
    if (!newComplaint.title.trim() || !newComplaint.category.trim()) return;

    const complaint: Complaint = {
      id: Date.now().toString(),
      type: newComplaint.type,
      title: newComplaint.title,
      description: newComplaint.description,
      submittedBy: 'Chef de Projet',
      submittedByEmail: 'chef.projet@company.com',
      category: newComplaint.category,
      priority: newComplaint.priority,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setComplaints([complaint, ...complaints]);
    
    // Reset form
    setNewComplaint({
      type: 'employee_to_admin',
      title: '',
      description: '',
      category: '',
      priority: 'medium'
    });
    setShowCreateModal(false);
  };

  const handleViewDetails = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setShowDetailModal(true);
  };

  const handleUpdateStatus = (newStatus: 'pending' | 'in_progress' | 'resolved' | 'closed') => {
    if (!selectedComplaint) return;

    setComplaints(complaints.map(c => 
      c.id === selectedComplaint.id 
        ? { ...c, status: newStatus, resolvedAt: newStatus === 'resolved' ? new Date().toISOString() : c.resolvedAt }
        : c
    ));

    setSelectedComplaint({ ...selectedComplaint, status: newStatus });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Réclamations</h1>
          <p className="text-gray-600">Gérez toutes les réclamations</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
        >
          <Plus className="h-5 w-5" />
          Nouvelle Réclamation
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
              activeTab === 'admin'
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-5 w-5" />
              <span>Réclamations avec Admin</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {complaints.filter(c => c.type === 'employee_to_admin' || c.type === 'admin').length}
              </span>
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('employee')}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
              activeTab === 'employee'
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <User className="h-5 w-5" />
              <span>Réclamations entre Employés</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'employee' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {complaints.filter(c => c.type === 'employee_to_employee').length}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">En Attente</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">En Cours</p>
          <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Résolues</p>
          <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une réclamation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="in_progress">En cours</option>
              <option value="resolved">Résolu</option>
              <option value="closed">Fermé</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Toutes les priorités</option>
              <option value="low">Faible</option>
              <option value="medium">Moyenne</option>
              <option value="high">Haute</option>
              <option value="urgent">Urgente</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Réclamation
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Soumis par
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Priorité
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{complaint.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{complaint.description}</p>
                      <span className="text-xs text-gray-400">{complaint.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getTypeColor(complaint.type)}`}>
                      {getTypeLabel(complaint.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="font-semibold text-gray-900">{complaint.submittedBy}</p>
                      <p className="text-sm text-gray-500">{complaint.submittedByEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getPriorityColor(complaint.priority)}`}>
                      {getPriorityLabel(complaint.priority)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(complaint.status)}`}>
                      {getStatusLabel(complaint.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(complaint.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewDetails(complaint)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Voir les détails"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredComplaints.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Aucune réclamation trouvée</p>
          </div>
        )}
      </div>

      {/* Modal Nouvelle Réclamation */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Nouvelle Réclamation</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewComplaint({
                    type: 'employee_to_admin',
                    title: '',
                    description: '',
                    category: '',
                    priority: 'medium'
                  });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              {/* Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type de réclamation <span className="text-red-500">*</span>
                </label>
                <select
                  value={newComplaint.type}
                  onChange={(e) => setNewComplaint({ ...newComplaint, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="employee_to_admin">Employé → Admin</option>
                  <option value="employee_to_employee">Employé → Employé</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>

              {/* Titre */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Titre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newComplaint.title}
                  onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ex: Problème de matériel informatique"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newComplaint.description}
                  onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Décrivez votre réclamation en détail..."
                />
              </div>

              {/* Catégorie */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Catégorie <span className="text-red-500">*</span>
                </label>
                <select
                  value={newComplaint.category}
                  onChange={(e) => setNewComplaint({ ...newComplaint, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="Matériel">Matériel</option>
                  <option value="Technique">Technique</option>
                  <option value="Formation">Formation</option>
                  <option value="RH">RH</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Communication">Communication</option>
                  <option value="Délais">Délais</option>
                  <option value="Ressources">Ressources</option>
                  <option value="Budget">Budget</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              {/* Priorité */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priorité
                </label>
                <select
                  value={newComplaint.priority}
                  onChange={(e) => setNewComplaint({ ...newComplaint, priority: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="low">Faible</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Haute</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewComplaint({
                    type: 'employee_to_admin',
                    title: '',
                    description: '',
                    category: '',
                    priority: 'medium'
                  });
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleCreateComplaint}
                disabled={!newComplaint.title.trim() || !newComplaint.category}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Créer la réclamation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails de la Réclamation */}
      {showDetailModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Détails de la Réclamation</h2>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedComplaint(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* En-tête avec badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getTypeColor(selectedComplaint.type)}`}>
                  {getTypeLabel(selectedComplaint.type)}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getPriorityColor(selectedComplaint.priority)}`}>
                  {getPriorityLabel(selectedComplaint.priority)}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(selectedComplaint.status)}`}>
                  {getStatusLabel(selectedComplaint.status)}
                </span>
                <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-semibold">
                  {selectedComplaint.category}
                </span>
              </div>

              {/* Titre */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedComplaint.title}</h3>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600 whitespace-pre-wrap">{selectedComplaint.description || 'Aucune description fournie'}</p>
              </div>

              {/* Informations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Soumis par</p>
                  <p className="font-semibold text-gray-900">{selectedComplaint.submittedBy}</p>
                  <p className="text-sm text-gray-600">{selectedComplaint.submittedByEmail}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Date de création</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(selectedComplaint.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                {selectedComplaint.resolvedAt && (
                  <div className="p-4 bg-green-50 rounded-lg md:col-span-2">
                    <p className="text-xs text-green-600 mb-1">Date de résolution</p>
                    <p className="font-semibold text-green-900">
                      {new Date(selectedComplaint.resolvedAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
              </div>

              {/* Changer le statut */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Changer le statut</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleUpdateStatus('pending')}
                    disabled={selectedComplaint.status === 'pending'}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedComplaint.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700 cursor-not-allowed'
                        : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                    }`}
                  >
                    En attente
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('in_progress')}
                    disabled={selectedComplaint.status === 'in_progress'}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedComplaint.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-700 cursor-not-allowed'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}
                  >
                    En cours
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('resolved')}
                    disabled={selectedComplaint.status === 'resolved'}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedComplaint.status === 'resolved'
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : 'bg-green-50 text-green-700 hover:bg-green-100'
                    }`}
                  >
                    Résolu
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('closed')}
                    disabled={selectedComplaint.status === 'closed'}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedComplaint.status === 'closed'
                        ? 'bg-gray-200 text-gray-700 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Fermé
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedComplaint(null);
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
