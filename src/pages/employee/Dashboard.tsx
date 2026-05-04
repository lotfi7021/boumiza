import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Calendar, 
  Target,
  TrendingUp,
  FileText,
  Users,
  MessageSquare,
  Award,
  BarChart3,
  Activity
} from 'lucide-react';

export default function EmployeeDashboard() {
  // FAKE DATA - Données de l'employé
  const employeeStats = {
    tasksAssigned: 24,
    tasksCompleted: 18,
    tasksInProgress: 4,
    tasksPending: 2,
    projectsInvolved: 3,
    hoursWorked: 156,
    performance: 87,
    completionRate: 75
  };

  const myTasks = [
    { 
      id: 1, 
      title: 'Développer API utilisateurs', 
      project: 'Système CRM', 
      priority: 'Haute', 
      status: 'En cours', 
      dueDate: '2024-02-15',
      progress: 65
    },
    { 
      id: 2, 
      title: 'Tests unitaires module auth', 
      project: 'Application Mobile', 
      priority: 'Moyenne', 
      status: 'À faire', 
      dueDate: '2024-02-18',
      progress: 0
    },
    { 
      id: 3, 
      title: 'Correction bugs interface', 
      project: 'Site Web Corporate', 
      priority: 'Haute', 
      status: 'En cours', 
      dueDate: '2024-02-12',
      progress: 80
    },
    { 
      id: 4, 
      title: 'Documentation technique', 
      project: 'Système CRM', 
      priority: 'Basse', 
      status: 'En révision', 
      dueDate: '2024-02-20',
      progress: 90
    }
  ];

  const myProjects = [
    { name: 'Système CRM', role: 'Développeur Frontend', progress: 85, tasks: 8 },
    { name: 'Application Mobile', role: 'Développeur React Native', progress: 72, tasks: 6 },
    { name: 'Site Web Corporate', role: 'Développeur Frontend', progress: 45, tasks: 10 }
  ];

  const recentActivities = [
    { type: 'task', message: 'Tâche "API utilisateurs" mise à jour', time: '30 min', icon: CheckCircle },
    { type: 'comment', message: 'Nouveau commentaire sur "Tests unitaires"', time: '1h', icon: MessageSquare },
    { type: 'assignment', message: 'Nouvelle tâche assignée: "Documentation"', time: '2h', icon: FileText },
    { type: 'meeting', message: 'Réunion équipe Frontend programmée', time: '3h', icon: Users },
    { type: 'achievement', message: 'Objectif mensuel atteint!', time: '1 jour', icon: Award }
  ];

  const weeklyProgress = [
    { day: 'Lun', completed: 3, assigned: 4 },
    { day: 'Mar', completed: 2, assigned: 3 },
    { day: 'Mer', completed: 4, assigned: 5 },
    { day: 'Jeu', completed: 3, assigned: 3 },
    { day: 'Ven', completed: 2, assigned: 4 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours': return 'bg-blue-100 text-blue-700';
      case 'Terminé': return 'bg-green-100 text-green-700';
      case 'À faire': return 'bg-gray-100 text-gray-700';
      case 'En révision': return 'bg-yellow-100 text-yellow-700';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mon Dashboard</h1>
        <p className="text-gray-600">Bienvenue, Marie Dubois - Développeuse Frontend</p>
      </div>

      {/* Statistiques Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tâches Assignées</p>
              <p className="text-2xl font-bold text-gray-900">{employeeStats.tasksAssigned}</p>
              <p className="text-xs text-gray-500">{employeeStats.tasksInProgress} en cours</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tâches Terminées</p>
              <p className="text-2xl font-bold text-gray-900">{employeeStats.tasksCompleted}</p>
              <p className="text-xs text-gray-500">{employeeStats.completionRate}% de réussite</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Projets Actifs</p>
              <p className="text-2xl font-bold text-gray-900">{employeeStats.projectsInvolved}</p>
              <p className="text-xs text-gray-500">Participation active</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Performance</p>
              <p className="text-2xl font-bold text-gray-900">{employeeStats.performance}%</p>
              <p className="text-xs text-gray-500">Ce mois-ci</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques Secondaires */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Heures Travaillées</p>
              <p className="text-xl font-bold text-gray-900">{employeeStats.hoursWorked}h</p>
            </div>
            <Clock className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tâches en Attente</p>
              <p className="text-xl font-bold text-gray-900">{employeeStats.tasksPending}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Taux de Completion</p>
              <p className="text-xl font-bold text-gray-900">{employeeStats.completionRate}%</p>
            </div>
            <Award className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Mes Tâches */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Mes Tâches</h2>
          <FileText className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="space-y-4">
          {myTasks.map((task) => (
            <div key={task.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Projet: {task.project}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {task.dueDate}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mes Projets et Progression Hebdomadaire */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mes Projets */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Mes Projets</h2>
            <Target className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="space-y-4">
            {myProjects.map((project, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  <span className="text-sm text-gray-600">{project.tasks} tâches</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{project.role}</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Progression</span>
                      <span className="font-semibold text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progression Hebdomadaire */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Progression Hebdomadaire</h2>
            <BarChart3 className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-50 rounded-lg p-3 mb-2">
                  <div className="text-lg font-bold text-green-600">{day.completed}</div>
                  <div className="text-xs text-gray-600">Terminées</div>
                  <div className="mt-1 text-sm font-semibold text-blue-600">{day.assigned}</div>
                  <div className="text-xs text-gray-600">Assignées</div>
                </div>
                <div className="text-sm font-semibold text-gray-700">{day.day}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activités Récentes */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Activités Récentes</h2>
          <Activity className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="p-2 rounded-lg bg-indigo-100">
                <activity.icon className="h-4 w-4 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">Il y a {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Objectifs et Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-bold text-green-900">Objectifs du Mois</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white bg-opacity-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-green-800">Terminer 20 tâches</p>
                <span className="text-xs text-green-600">18/20</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div className="bg-white bg-opacity-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-green-800">Performance &gt; 85%</p>
                <span className="text-xs text-green-600">87%</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-bold text-blue-900">Performance</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white bg-opacity-50 rounded-lg p-3">
              <p className="text-sm font-semibold text-blue-800">Taux de réussite</p>
              <p className="text-2xl font-bold text-blue-900">{employeeStats.completionRate}%</p>
              <p className="text-xs text-blue-600">+5% ce mois-ci</p>
            </div>
            <div className="bg-white bg-opacity-50 rounded-lg p-3">
              <p className="text-sm font-semibold text-blue-800">Temps moyen par tâche</p>
              <p className="text-2xl font-bold text-blue-900">6.5h</p>
              <p className="text-xs text-blue-600">-0.5h ce mois-ci</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}