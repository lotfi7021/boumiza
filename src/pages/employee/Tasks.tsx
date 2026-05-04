import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  MessageSquare,
  FileText,
  User,
  X,
  Plus
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  assignedBy: string;
  priority: 'Haute' | 'Moyenne' | 'Basse';
  status: 'À faire' | 'En cours' | 'En révision' | 'Terminé';
  dueDate: string;
  createdDate: string;
  progress: number;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  comments: number;
}

export default function EmployeeTasks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [priorityFilter, setPriorityFilter] = useState('Tous');
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [taskUpdate, setTaskUpdate] = useState({
    progress: 0,
    status: '',
    comment: ''
  });

  // FAKE DATA
  const [tasks, setTasks] = useState<Task[]>([
   
    {
      id: '2',
      title: 'Tests unitaires module auth',
      description: 'Écrire les tests unitaires pour le module d\'authentification',
      project: 'Application Mobile',
      assignedBy: 'Sophie Durand',
      priority: 'Moyenne',
      status: 'À faire',
      dueDate: '2024-02-18',
      createdDate: '2024-02-03',
      progress: 0,
      estimatedHours: 8,
      actualHours: 0,
      tags: ['Tests', 'Auth', 'Jest'],
      comments: 1
    },
    
  
    {
      id: '6',
      title: 'Optimisation base de données',
      description: 'Optimiser les requêtes SQL et ajouter des index pour améliorer les performances',
      project: 'Système CRM',
      assignedBy: 'Jean Martin',
      priority: 'Moyenne',
      status: 'Terminé',
      dueDate: '2024-02-08',
      createdDate: '2024-01-25',
      progress: 100,
      estimatedHours: 10,
      actualHours: 8,
      tags: ['Database', 'SQL', 'Performance'],
      comments: 4
    }
  ]);

  const statusOptions = ['Tous', 'À faire', 'En cours', 'En révision', 'Terminé'];
  const priorityOptions = ['Tous', 'Haute', 'Moyenne', 'Basse'];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tous' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'Tous' || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const taskStats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'À faire').length,
    inProgress: tasks.filter(t => t.status === 'En cours').length,
    inReview: tasks.filter(t => t.status === 'En révision').length,
    completed: tasks.filter(t => t.status === 'Terminé').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours': return 'bg-blue-100 text-blue-700';
      case 'Terminé': return 'bg-green-100 text-green-700';
      case 'À faire': return 'bg-gray-100 text-gray-700';
      case 'En révision': return 'bg-yellow-100 text-yellow-700';
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
      case 'À faire': return <FileText className="h-4 w-4" />;
      case 'En révision': return <Eye className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const openTaskDetail = (task: Task) => {
    setSelectedTask(task);
    setShowTaskDetail(true);
  };

  const openUpdateModal = (task: Task) => {
    setSelectedTask(task);
    setTaskUpdate({
      progress: task.progress,
      status: task.status,
      comment: ''
    });
    setShowUpdateModal(true);
  };

  const handleUpdateTask = () => {
    if (!selectedTask) return;

    setTasks(tasks.map(t => 
      t.id === selectedTask.id 
        ? { ...t, progress: taskUpdate.progress, status: taskUpdate.status as any }
        : t
    ));

    setShowUpdateModal(false);
    setSelectedTask(null);
    setTaskUpdate({ progress: 0, status: '', comment: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mes Tâches</h1>
        <p className="text-gray-600">Gérez vos tâches assignées et suivez votre progression</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{taskStats.total}</p>
            </div>
            <FileText className="h-8 w-8 text-gray-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">À faire</p>
              <p className="text-2xl font-bold text-gray-900">{taskStats.todo}</p>
            </div>
            <FileText className="h-8 w-8 text-gray-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En cours</p>
              <p className="text-2xl font-bold text-blue-900">{taskStats.inProgress}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En révision</p>
              <p className="text-2xl font-bold text-yellow-900">{taskStats.inReview}</p>
            </div>
            <Eye className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Terminées</p>
              <p className="text-2xl font-bold text-green-900">{taskStats.completed}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filtres et Recherche */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {priorityOptions.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>

          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold">
            <Filter className="h-5 w-5" />
            Filtrer
          </button>
        </div>
      </div>

      {/* Liste des Tâches */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="space-y-0">
          {filteredTasks.map((task) => (
            <div key={task.id} className="border-b border-gray-100 last:border-b-0 p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{task.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {task.project}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {task.assignedBy}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {task.dueDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {task.comments} commentaires
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                    {getStatusIcon(task.status)}
                    <span className="ml-1">{task.status}</span>
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex-1 mr-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Progression</span>
                    <span className="font-semibold text-gray-900">{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {task.actualHours}h / {task.estimatedHours}h
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {task.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openTaskDetail(task)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Voir les détails"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => openUpdateModal(task)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold"
                  >
                    Mettre à jour
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Aucune tâche trouvée</p>
          </div>
        )}
      </div>

      {/* Modal Détails de la Tâche */}
      {showTaskDetail && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Détails de la Tâche</h2>
              <button
                onClick={() => setShowTaskDetail(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedTask.title}</h3>
                <p className="text-gray-600">{selectedTask.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Projet</label>
                  <p className="text-gray-900">{selectedTask.project}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Assigné par</label>
                  <p className="text-gray-900">{selectedTask.assignedBy}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Priorité</label>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(selectedTask.priority)}`}>
                    {selectedTask.priority}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Statut</label>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedTask.status)}`}>
                    {selectedTask.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date d'échéance</label>
                  <p className="text-gray-900">{selectedTask.dueDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date de création</label>
                  <p className="text-gray-900">{selectedTask.createdDate}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Progression</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-indigo-600 h-3 rounded-full"
                        style={{ width: `${selectedTask.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">{selectedTask.progress}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Temps estimé</label>
                  <p className="text-gray-900">{selectedTask.estimatedHours}h</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Temps passé</label>
                  <p className="text-gray-900">{selectedTask.actualHours}h</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
                <div className="flex items-center gap-2">
                  {selectedTask.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowTaskDetail(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  setShowTaskDetail(false);
                  openUpdateModal(selectedTask);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              >
                Mettre à jour
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Mise à jour de la Tâche */}
      {showUpdateModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Mettre à jour la Tâche</h2>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Progression ({taskUpdate.progress}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={taskUpdate.progress}
                  onChange={(e) => setTaskUpdate({ ...taskUpdate, progress: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Statut
                </label>
                <select
                  value={taskUpdate.status}
                  onChange={(e) => setTaskUpdate({ ...taskUpdate, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="À faire">À faire</option>
                  <option value="En cours">En cours</option>
                  <option value="En révision">En révision</option>
                  <option value="Terminé">Terminé</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Commentaire (optionnel)
                </label>
                <textarea
                  value={taskUpdate.comment}
                  onChange={(e) => setTaskUpdate({ ...taskUpdate, comment: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ajoutez un commentaire sur votre progression..."
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleUpdateTask}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              >
                Mettre à jour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}