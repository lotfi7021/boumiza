import { useState } from 'react';
import { Plus, Search, CheckSquare } from 'lucide-react';
import { TaskItem } from '../../components/chef_projet';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  projectName: string;
  assignedTo: string;
  dueDate: string;
  estimatedHours: number;
  actualHours?: number;
}

export default function ChefProjetTasks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // FAKE DATA
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Révision du design UI',
      description: 'Revoir et valider les maquettes de la page d\'accueil',
      status: 'in_progress',
      priority: 'high',
      projectName: 'Site E-commerce',
      assignedTo: 'Marie Dubois',
      dueDate: '2026-05-02',
      estimatedHours: 8,
      actualHours: 5
    },
    {
      id: '2',
      title: 'Tests d\'intégration API',
      description: 'Tester l\'intégration complète de l\'API de paiement',
      status: 'todo',
      priority: 'critical',
      projectName: 'App Mobile Banking',
      assignedTo: 'Jean Martin',
      dueDate: '2026-05-03',
      estimatedHours: 12
    },
    {
      id: '3',
      title: 'Documentation technique',
      description: 'Rédiger la documentation pour les endpoints API',
      status: 'in_progress',
      priority: 'medium',
      projectName: 'Dashboard Analytics',
      assignedTo: 'Sophie Laurent',
      dueDate: '2026-05-05',
      estimatedHours: 6,
      actualHours: 3
    },
    {
      id: '4',
      title: 'Optimisation base de données',
      description: 'Améliorer les performances des requêtes SQL',
      status: 'review',
      priority: 'high',
      projectName: 'Système RH',
      assignedTo: 'Pierre Durand',
      dueDate: '2026-05-04',
      estimatedHours: 10,
      actualHours: 11
    },
    {
      id: '5',
      title: 'Mise en place CI/CD',
      description: 'Configurer le pipeline de déploiement automatique',
      status: 'completed',
      priority: 'medium',
      projectName: 'Portail Client',
      assignedTo: 'Luc Bernard',
      dueDate: '2026-04-28',
      estimatedHours: 8,
      actualHours: 7
    },
    {
      id: '6',
      title: 'Réunion client',
      description: 'Présentation de l\'avancement du projet',
      status: 'todo',
      priority: 'high',
      projectName: 'Site E-commerce',
      assignedTo: 'Marie Dubois',
      dueDate: '2026-05-06',
      estimatedHours: 2
    },
    {
      id: '7',
      title: 'Correction bugs critiques',
      description: 'Résoudre les bugs identifiés lors des tests',
      status: 'in_progress',
      priority: 'critical',
      projectName: 'App Mobile Banking',
      assignedTo: 'Jean Martin',
      dueDate: '2026-05-01',
      estimatedHours: 16,
      actualHours: 10
    },
    {
      id: '8',
      title: 'Design système de notifications',
      description: 'Créer le système de notifications push',
      status: 'todo',
      priority: 'medium',
      projectName: 'App Mobile Banking',
      assignedTo: 'Sophie Laurent',
      dueDate: '2026-05-08',
      estimatedHours: 12
    }
  ]);

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      todo: 'À faire',
      in_progress: 'En cours',
      review: 'En révision',
      completed: 'Terminé'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      todo: 'bg-gray-100 text-gray-700',
      in_progress: 'bg-blue-100 text-blue-700',
      review: 'bg-yellow-100 text-yellow-700',
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

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tâches</h1>
          <p className="text-gray-600">Gérez toutes vos tâches et suivez leur progression</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold">
          <Plus className="h-5 w-5" />
          Nouvelle Tâche
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Tâches</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">À Faire</p>
          <p className="text-2xl font-bold text-gray-600">{stats.todo}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">En Cours</p>
          <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Terminées</p>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une tâche..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="todo">À faire</option>
            <option value="in_progress">En cours</option>
            <option value="review">En révision</option>
            <option value="completed">Terminé</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task}
            onEdit={() => console.log('Edit task:', task.id)}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucune tâche trouvée</p>
        </div>
      )}
    </div>
  );
}
