import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, FolderKanban, X, Eye, CheckSquare } from 'lucide-react';
import { ProjectCard } from '../../components/chef_projet';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  spentBudget: number;
  teamMembers: number;
  tasksCompleted: number;
  totalTasks: number;
}

export default function ChefProjetProjects() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: 'planning' as 'planning' | 'in_progress' | 'on_hold' | 'completed',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    startDate: '',
    endDate: '',
    budget: 0,
    teamMembers: 0
  });
  
  // FAKE DATA
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Refonte Site E-commerce',
      description: 'Modernisation complète du site e-commerce avec nouvelle UI/UX',
      status: 'in_progress',
      priority: 'high',
      progress: 65,
      startDate: '2026-04-01',
      endDate: '2026-05-15',
      budget: 50000,
      spentBudget: 32500,
      teamMembers: 5,
      tasksCompleted: 28,
      totalTasks: 45
    },
    {
      id: '2',
      name: 'Application Mobile Banking',
      description: 'Développement d\'une application mobile pour services bancaires',
      status: 'in_progress',
      priority: 'critical',
      progress: 40,
      startDate: '2026-03-15',
      endDate: '2026-06-01',
      budget: 80000,
      spentBudget: 35000,
      teamMembers: 8,
      tasksCompleted: 15,
      totalTasks: 52
    },
   
 
   
  ]);

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      planning: 'Planification',
      in_progress: 'En cours',
      on_hold: 'En pause',
      completed: 'Terminé'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      planning: 'bg-blue-100 text-blue-700',
      in_progress: 'bg-orange-100 text-orange-700',
      on_hold: 'bg-yellow-100 text-yellow-700',
      completed: 'bg-green-100 text-green-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-blue-100 text-blue-700',
      high: 'bg-orange-100 text-orange-700',
      critical: 'bg-red-100 text-red-700'
    };
    return colors[priority] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityLabel = (priority: string) => {
    const labels: Record<string, string> = {
      low: 'Faible',
      medium: 'Moyenne',
      high: 'Haute',
      critical: 'Critique'
    };
    return labels[priority] || priority;
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'in_progress').length,
    completed: projects.filter(p => p.status === 'completed').length,
    planning: projects.filter(p => p.status === 'planning').length
  };

  const handleCreateProject = () => {
    if (!newProject.name.trim()) return;

    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      status: newProject.status,
      priority: newProject.priority,
      progress: 0,
      startDate: newProject.startDate || new Date().toISOString().split('T')[0],
      endDate: newProject.endDate || new Date().toISOString().split('T')[0],
      budget: newProject.budget,
      spentBudget: 0,
      teamMembers: newProject.teamMembers,
      tasksCompleted: 0,
      totalTasks: 0
    };

    setProjects([project, ...projects]);
    
    // Reset form
    setNewProject({
      name: '',
      description: '',
      status: 'planning',
      priority: 'medium',
      startDate: '',
      endDate: '',
      budget: 0,
      teamMembers: 0
    });
    setShowCreateModal(false);
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setShowDetailModal(true);
  };

  const handleManageTasks = (project: Project) => {
    // Rediriger vers le Kanban avec l'ID du projet
    navigate(`/chef-projet/kanban?project=${project.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes Projets</h1>
          <p className="text-gray-600">Gérez tous vos projets en cours</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
        >
          <Plus className="h-5 w-5" />
          Nouveau Projet
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Projets</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">En Cours</p>
          <p className="text-2xl font-bold text-orange-600">{stats.inProgress}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Terminés</p>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Planification</p>
          <p className="text-2xl font-bold text-blue-600">{stats.planning}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un projet..."
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
              <option value="planning">Planification</option>
              <option value="in_progress">En cours</option>
              <option value="on_hold">En pause</option>
              <option value="completed">Terminé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project}
            onViewDetails={() => handleViewDetails(project)}
            onManageTasks={() => handleManageTasks(project)}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <FolderKanban className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucun projet trouvé</p>
        </div>
      )}

      {/* Modal Nouveau Projet */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Nouveau Projet</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewProject({
                    name: '',
                    description: '',
                    status: 'planning',
                    priority: 'medium',
                    startDate: '',
                    endDate: '',
                    budget: 0,
                    teamMembers: 0
                  });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              {/* Nom */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom du projet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ex: Refonte Site E-commerce"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Décrivez le projet..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Statut */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Statut
                  </label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="planning">Planification</option>
                    <option value="in_progress">En cours</option>
                    <option value="on_hold">En pause</option>
                    <option value="completed">Terminé</option>
                  </select>
                </div>

                {/* Priorité */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Priorité
                  </label>
                  <select
                    value={newProject.priority}
                    onChange={(e) => setNewProject({ ...newProject, priority: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="low">Faible</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                    <option value="critical">Critique</option>
                  </select>
                </div>

                {/* Date de début */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date de début
                  </label>
                  <input
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Date de fin */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date de fin
                  </label>
                  <input
                    type="date"
                    value={newProject.endDate}
                    onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Budget (€)
                  </label>
                  <input
                    type="number"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({ ...newProject, budget: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="50000"
                  />
                </div>

                {/* Membres d'équipe */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Membres d'équipe
                  </label>
                  <input
                    type="number"
                    value={newProject.teamMembers}
                    onChange={(e) => setNewProject({ ...newProject, teamMembers: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="5"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewProject({
                    name: '',
                    description: '',
                    status: 'planning',
                    priority: 'medium',
                    startDate: '',
                    endDate: '',
                    budget: 0,
                    teamMembers: 0
                  });
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleCreateProject}
                disabled={!newProject.name.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Créer le projet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails du Projet */}
      {showDetailModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Détails du Projet</h2>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedProject(null);
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
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(selectedProject.status)}`}>
                  {getStatusLabel(selectedProject.status)}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getPriorityColor(selectedProject.priority)}`}>
                  {getPriorityLabel(selectedProject.priority)}
                </span>
              </div>

              {/* Titre */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedProject.name}</h3>
                <p className="text-gray-600">{selectedProject.description}</p>
              </div>

              {/* Progression */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Progression</span>
                  <span className="text-sm font-bold text-indigo-600">{selectedProject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-indigo-600 h-3 rounded-full transition-all"
                    style={{ width: `${selectedProject.progress}%` }}
                  />
                </div>
              </div>

              {/* Informations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Date de début</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(selectedProject.startDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Date de fin</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(selectedProject.endDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Budget</p>
                  <p className="font-semibold text-gray-900">{selectedProject.budget.toLocaleString('fr-FR')} €</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Dépensé: {selectedProject.spentBudget.toLocaleString('fr-FR')} €
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Équipe</p>
                  <p className="font-semibold text-gray-900">{selectedProject.teamMembers} membres</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Tâches</p>
                  <p className="font-semibold text-gray-900">
                    {selectedProject.tasksCompleted} / {selectedProject.totalTasks}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedProject(null);
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Fermer
              </button>
              <button
                onClick={() => handleManageTasks(selectedProject)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center gap-2"
              >
                <CheckSquare className="h-4 w-4" />
                Gérer les tâches
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
