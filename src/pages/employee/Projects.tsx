import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  Users, 
  Target, 
  TrendingUp,
  Eye,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  X,
  User,
  Kanban
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'En cours' | 'Terminé' | 'En attente' | 'En retard';
  priority: 'Haute' | 'Moyenne' | 'Basse';
  progress: number;
  startDate: string;
  dueDate: string;
  myRole: string;
  teamSize: number;
  myTasks: number;
  completedTasks: number;
  totalTasks: number;
  projectManager: string;
  budget: number;
  technologies: string[];
}

export default function EmployeeProjects() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // FAKE DATA
  const projects: Project[] = [
    {
      id: '1',
      name: 'Système CRM',
      description: 'Développement d\'un système de gestion de la relation client complet avec tableau de bord, gestion des contacts et suivi des ventes.',
      status: 'En cours',
      priority: 'Haute',
      progress: 85,
      startDate: '2024-01-15',
      dueDate: '2024-02-28',
      myRole: 'Développeur Frontend',
      teamSize: 8,
      myTasks: 12,
      completedTasks: 8,
      totalTasks: 45,
      projectManager: 'Jean Martin',
      budget: 150000,
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL']
    },
    {
      id: '2',
      name: 'Application Mobile',
      description: 'Application mobile cross-platform pour la gestion des tâches et la collaboration d\'équipe.',
      status: 'En cours',
      priority: 'Haute',
      progress: 72,
      startDate: '2024-01-20',
      dueDate: '2024-03-15',
      myRole: 'Développeur React Native',
      teamSize: 6,
      myTasks: 8,
      completedTasks: 5,
      totalTasks: 32,
      projectManager: 'Sophie Durand',
      budget: 120000,
      technologies: ['React Native', 'Firebase', 'Redux', 'Jest']
    },
    
    
    
  ];

  const statusOptions = ['Tous', 'En cours', 'Terminé', 'En attente', 'En retard'];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tous' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const projectStats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'En cours').length,
    completed: projects.filter(p => p.status === 'Terminé').length,
    pending: projects.filter(p => p.status === 'En attente').length,
    totalTasks: projects.reduce((acc, p) => acc + p.myTasks, 0),
    completedTasks: projects.reduce((acc, p) => acc + p.completedTasks, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours': return 'bg-blue-100 text-blue-700';
      case 'Terminé': return 'bg-green-100 text-green-700';
      case 'En attente': return 'bg-yellow-100 text-yellow-700';
      case 'En retard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Haute': return 'bg-red-100 text-red-700';
      case 'Moyenne': return 'bg-yellow-100 text-yellow-700';
      case 'Basse': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'En cours': return <Clock className="h-4 w-4" />;
      case 'Terminé': return <CheckCircle className="h-4 w-4" />;
      case 'En attente': return <AlertTriangle className="h-4 w-4" />;
      case 'En retard': return <AlertTriangle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const openProjectDetail = (project: Project) => {
    setSelectedProject(project);
    setShowProjectDetail(true);
  };

  const goToKanban = (projectId: string) => {
    navigate(`/employee/kanban?project=${projectId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mes Projets</h1>
        <p className="text-gray-600">Suivez vos projets et votre contribution à chaque équipe</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Projets Actifs</p>
              <p className="text-2xl font-bold text-gray-900">{projectStats.active}</p>
              <p className="text-xs text-gray-500">sur {projectStats.total} total</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Projets Terminés</p>
              <p className="text-2xl font-bold text-gray-900">{projectStats.completed}</p>
              <p className="text-xs text-gray-500">Avec succès</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Mes Tâches</p>
              <p className="text-2xl font-bold text-gray-900">{projectStats.totalTasks}</p>
              <p className="text-xs text-gray-500">{projectStats.completedTasks} terminées</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Taux de Réussite</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((projectStats.completedTasks / projectStats.totalTasks) * 100)}%
              </p>
              <p className="text-xs text-gray-500">Performance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et Recherche */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            <span className="font-semibold">{filteredProjects.length}</span> projet(s) trouvé(s)
          </div>
        </div>
      </div>

      {/* Liste des Projets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                  {getStatusIcon(project.status)}
                  <span className="ml-1">{project.status}</span>
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="h-4 w-4" />
                <span>{project.myRole}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="h-4 w-4" />
                <span>{project.teamSize} membres</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{project.dueDate}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FileText className="h-4 w-4" />
                <span>{project.myTasks} tâches</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Progression globale</span>
                <span className="font-semibold text-gray-900">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Mes tâches</span>
                <span className="font-semibold text-gray-900">
                  {project.completedTasks}/{project.myTasks}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(project.completedTasks / project.myTasks) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-xs text-gray-500">+{project.technologies.length - 3}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToKanban(project.id)}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                >
                  <Kanban className="h-4 w-4" />
                  Kanban
                </button>
                <button
                  onClick={() => openProjectDetail(project)}
                  className="flex items-center gap-2 px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold"
                >
                  <Eye className="h-4 w-4" />
                  Détails
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucun projet trouvé</p>
        </div>
      )}

      {/* Modal Détails du Projet */}
      {showProjectDetail && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Détails du Projet</h2>
              <button
                onClick={() => setShowProjectDetail(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedProject.name}</h3>
                <p className="text-gray-600">{selectedProject.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Statut</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedProject.status)}`}>
                      {getStatusIcon(selectedProject.status)}
                      <span className="ml-1">{selectedProject.status}</span>
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Priorité</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(selectedProject.priority)}`}>
                      {selectedProject.priority}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Mon Rôle</label>
                    <p className="text-gray-900">{selectedProject.myRole}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Chef de Projet</label>
                    <p className="text-gray-900">{selectedProject.projectManager}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Date de début</label>
                    <p className="text-gray-900">{selectedProject.startDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Date d'échéance</label>
                    <p className="text-gray-900">{selectedProject.dueDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Taille de l'équipe</label>
                    <p className="text-gray-900">{selectedProject.teamSize} membres</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Budget</label>
                    <p className="text-gray-900">{selectedProject.budget.toLocaleString()}€</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Progression Globale</label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-indigo-600 h-3 rounded-full"
                          style={{ width: `${selectedProject.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900">{selectedProject.progress}%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mes Tâches</label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-600 h-3 rounded-full"
                          style={{ width: `${(selectedProject.completedTasks / selectedProject.myTasks) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {selectedProject.completedTasks}/{selectedProject.myTasks}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Technologies Utilisées</label>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <span className="font-semibold text-gray-700">Tâches Totales</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{selectedProject.totalTasks}</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-700">Mes Tâches</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">{selectedProject.myTasks}</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-700">Terminées</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">{selectedProject.completedTasks}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowProjectDetail(false)}
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