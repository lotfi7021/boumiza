import { FolderKanban, CheckSquare, Users, Clock, TrendingUp, AlertCircle } from 'lucide-react';

export default function ChefProjetDashboard() {
  // FAKE DATA
  const stats = {
    activeProjects: 5,
    completedTasks: 42,
    teamMembers: 8,
    hoursThisWeek: 35
  };

  const recentProjects = [
    {
      id: '1',
      name: 'Refonte Site E-commerce',
      status: 'in_progress',
      progress: 65,
      dueDate: '2026-05-15',
      priority: 'high'
    },
    {
      id: '2',
      name: 'Application Mobile Banking',
      status: 'in_progress',
      progress: 40,
      dueDate: '2026-06-01',
      priority: 'critical'
    },
    {
      id: '3',
      name: 'Dashboard Analytics',
      status: 'planning',
      progress: 15,
      dueDate: '2026-05-20',
      priority: 'medium'
    }
  ];

  const upcomingTasks = [
    { id: '1', title: 'Révision du design UI', project: 'Site E-commerce', dueDate: '2026-05-02', priority: 'high' },
    { id: '2', title: 'Tests d\'intégration API', project: 'App Mobile', dueDate: '2026-05-03', priority: 'critical' },
    { id: '3', title: 'Réunion client', project: 'Dashboard Analytics', dueDate: '2026-05-05', priority: 'medium' }
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      planning: 'bg-blue-100 text-blue-700',
      in_progress: 'bg-orange-100 text-orange-700',
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Chef de Projet</h1>
        <p className="text-gray-600">Vue d'ensemble de vos projets et tâches</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <FolderKanban className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Projets Actifs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeProjects}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckSquare className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tâches Complétées</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedTasks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Membres d'Équipe</p>
              <p className="text-2xl font-bold text-gray-900">{stats.teamMembers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-xl">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Heures Cette Semaine</p>
              <p className="text-2xl font-bold text-gray-900">{stats.hoursThisWeek}h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Projets en Cours</h2>
          </div>
          <div className="p-6 space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-xl p-4 hover:border-indigo-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                        {project.status === 'in_progress' ? 'En cours' : 'Planification'}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(project.priority)}`}>
                        {project.priority === 'high' ? 'Haute' : project.priority === 'critical' ? 'Critique' : 'Moyenne'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progression</span>
                    <span className="font-semibold text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">Échéance: {new Date(project.dueDate).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Tâches à Venir</h2>
          </div>
          <div className="p-6 space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl hover:border-indigo-300 transition-colors">
                <div className="mt-1">
                  <div className="h-5 w-5 rounded border-2 border-gray-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{task.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{task.project}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority === 'high' ? 'Haute' : task.priority === 'critical' ? 'Critique' : 'Moyenne'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-4">Actions Rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-colors text-left">
            <FolderKanban className="h-6 w-6 mb-2" />
            <p className="font-semibold">Nouveau Projet</p>
            <p className="text-sm text-indigo-100">Créer un projet</p>
          </button>
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-colors text-left">
            <CheckSquare className="h-6 w-6 mb-2" />
            <p className="font-semibold">Ajouter Tâche</p>
            <p className="text-sm text-indigo-100">Créer une tâche</p>
          </button>
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-colors text-left">
            <TrendingUp className="h-6 w-6 mb-2" />
            <p className="font-semibold">Voir Rapports</p>
            <p className="text-sm text-indigo-100">Analyser les performances</p>
          </button>
        </div>
      </div>
    </div>
  );
}
