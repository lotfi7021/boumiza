import { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2, X, AlertCircle } from 'lucide-react';

interface Complaint {
  id: string;
  type: 'admin' | 'employee';
  title: string;
  description: string;
  submittedBy: string;
  company: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  category: string;
  createdAt: string;
}

export default function SuperAdminComplaints() {
  const [activeTab, setActiveTab] = useState<'admin' | 'employee'>('admin');
  const [complaints, setComplaints] = useState<Complaint[]>([
    // Réclamations Admin
    {
      id: 'comp-1',
      type: 'admin',
      title: 'Problème d\'accès au système',
      description: 'Impossible de se connecter depuis ce matin',
      submittedBy: 'Ahmed Ben Ali',
      company: 'Tech Solutions SA',
      priority: 'high',
      status: 'in_progress',
      category: 'Technique',
      createdAt: '2024-01-15'
    },
    {
      id: 'comp-2',
      type: 'admin',
      title: 'Demande de nouvelles fonctionnalités',
      description: 'Besoin d\'un module de reporting avancé',
      submittedBy: 'Fatima Khoury',
      company: 'Digital Agency',
      priority: 'medium',
      status: 'pending',
      category: 'Fonctionnalité',
      createdAt: '2024-01-14'
    },
    {
      id: 'comp-3',
      type: 'admin',
      title: 'Bug dans le module de facturation',
      description: 'Les factures ne se génèrent pas correctement',
      submittedBy: 'Mohamed Saïdi',
      company: 'Startup Innovation',
      priority: 'urgent',
      status: 'pending',
      category: 'Bug',
      createdAt: '2024-01-16'
    },
    {
      id: 'comp-4',
      type: 'admin',
      title: 'Lenteur du système',
      description: 'Le système est très lent depuis la dernière mise à jour',
      submittedBy: 'Leila Mansouri',
      company: 'Consulting Group',
      priority: 'high',
      status: 'resolved',
      category: 'Performance',
      createdAt: '2024-01-10'
    },
    // Réclamations Employés
    {
      id: 'comp-5',
      type: 'employee',
      title: 'Retard de salaire',
      description: 'Mon salaire n\'a pas été versé ce mois-ci',
      submittedBy: 'Jean Dupont',
      company: 'Tech Solutions SA',
      priority: 'urgent',
      status: 'in_progress',
      category: 'Salaire',
      createdAt: '2024-01-15'
    },
    {
      id: 'comp-6',
      type: 'employee',
      title: 'Problème de congés',
      description: 'Ma demande de congé n\'a pas été approuvée',
      submittedBy: 'Marie Martin',
      company: 'Tech Solutions SA',
      priority: 'medium',
      status: 'pending',
      category: 'Congés',
      createdAt: '2024-01-14'
    },
    {
      id: 'comp-7',
      type: 'employee',
      title: 'Harcèlement au travail',
      description: 'Je subis du harcèlement de la part de mon manager',
      submittedBy: 'Pierre Bernard',
      company: 'Digital Agency',
      priority: 'urgent',
      status: 'in_progress',
      category: 'RH',
      createdAt: '2024-01-16'
    },
    {
      id: 'comp-8',
      type: 'employee',
      title: 'Conditions de travail',
      description: 'Le bureau est trop bruyant, besoin d\'un espace calme',
      submittedBy: 'Sophie Laurent',
      company: 'Tech Solutions SA',
      priority: 'low',
      status: 'pending',
      category: 'Environnement',
      createdAt: '2024-01-13'
    },
    {
      id: 'comp-9',
      type: 'employee',
      title: 'Équipement défectueux',
      description: 'Mon ordinateur ne fonctionne plus correctement',
      submittedBy: 'Thomas Petit',
      company: 'Startup Innovation',
      priority: 'high',
      status: 'resolved',
      category: 'Matériel',
      createdAt: '2024-01-12'
    },
    {
      id: 'comp-10',
      type: 'employee',
      title: 'Formation manquante',
      description: 'Besoin de formation sur les nouveaux outils',
      submittedBy: 'Julie Moreau',
      company: 'Digital Agency',
      priority: 'medium',
      status: 'pending',
      category: 'Formation',
      createdAt: '2024-01-11'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Filtrer par type (admin ou employee)
  const filteredByType = complaints.filter(c => c.type === activeTab);

  // Filtrer par recherche, statut et priorité
  const filteredComplaints = filteredByType.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || complaint.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: filteredByType.length,
    pending: filteredByType.filter(c => c.status === 'pending').length,
    inProgress: filteredByType.filter(c => c.status === 'in_progress').length,
    resolved: filteredByType.filter(c => c.status === 'resolved').length,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-700';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityLabel = (priority: string) => {
    const labels: Record<string, string> = {
      urgent: 'Urgent',
      high: 'Haute',
      medium: 'Moyenne',
      low: 'Basse'
    };
    return labels[priority] || priority;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'En attente',
      in_progress: 'En cours',
      resolved: 'Résolue',
      closed: 'Fermée'
    };
    return labels[status] || status;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Réclamations</h1>
          <p className="text-gray-600">Gérez toutes les réclamations des admins et employés</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'admin'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Réclamations Administrateurs
          </button>
          <button
            onClick={() => setActiveTab('employee')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'employee'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Réclamations Employés
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">En cours</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Résolues</p>
              <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par titre, description ou auteur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="in_progress">En cours</option>
            <option value="resolved">Résolue</option>
            <option value="closed">Fermée</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">Toutes les priorités</option>
            <option value="urgent">Urgent</option>
            <option value="high">Haute</option>
            <option value="medium">Moyenne</option>
            <option value="low">Basse</option>
          </select>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Réclamation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Soumis par
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entreprise
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priorité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{complaint.title}</p>
                      <p className="text-sm text-gray-500 line-clamp-1">{complaint.description}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                        {complaint.category}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {complaint.submittedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {complaint.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                      {getPriorityLabel(complaint.priority)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                      {getStatusLabel(complaint.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {complaint.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedComplaint(complaint);
                          setShowDetails(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Voir les détails"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Modifier le statut"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setComplaints(complaints.filter(c => c.id !== complaint.id));
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredComplaints.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Aucune réclamation trouvée</p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetails && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Détails de la réclamation</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm text-gray-600">Titre</p>
                <p className="text-lg font-semibold text-gray-900">{selectedComplaint.title}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Description</p>
                <p className="text-base text-gray-900">{selectedComplaint.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Soumis par</p>
                  <p className="text-base font-medium text-gray-900">{selectedComplaint.submittedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Entreprise</p>
                  <p className="text-base font-medium text-gray-900">{selectedComplaint.company}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Catégorie</p>
                  <p className="text-base font-medium text-gray-900">{selectedComplaint.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="text-base font-medium text-gray-900">{selectedComplaint.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Priorité</p>
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedComplaint.priority)}`}>
                    {getPriorityLabel(selectedComplaint.priority)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Statut</p>
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedComplaint.status)}`}>
                    {getStatusLabel(selectedComplaint.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Fermer
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Modifier le statut
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
