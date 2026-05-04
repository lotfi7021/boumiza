import { 
  Users, 
  FolderOpen, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Target,
  BarChart3,
  PieChart,
  Activity,
  Shield,
  Building2,
  UserCheck,
  FileText,
  Settings
} from 'lucide-react';

export default function SuperAdminDashboard() {
  // FAKE DATA - Statistiques complètes
  const globalStats = {
    totalEmployees: 247,
    activeEmployees: 231,
    totalProjects: 45,
    activeProjects: 28,
    completedProjects: 17,
    totalTasks: 1284,
    completedTasks: 892,
    pendingTasks: 392,
    totalTeams: 12,
    activeTeams: 11,
    totalAdmins: 8,
    totalComplaints: 23,
    resolvedComplaints: 18,
    pendingComplaints: 5
  };

  const projectProgress = [
    { name: 'Système CRM', progress: 85, status: 'En cours', priority: 'Haute', dueDate: '2024-02-15' },
    { name: 'Application Mobile', progress: 92, status: 'En cours', priority: 'Haute', dueDate: '2024-02-10' },
    { name: 'Site Web Corporate', progress: 67, status: 'En cours', priority: 'Moyenne', dueDate: '2024-02-28' },
    { name: 'Plateforme E-commerce', progress: 45, status: 'En cours', priority: 'Haute', dueDate: '2024-03-15' },
    { name: 'Système de Facturation', progress: 78, status: 'En cours', priority: 'Moyenne', dueDate: '2024-02-20' }
  ];

  const tasksByPhase = [
    { phase: 'À faire', count: 156, color: 'bg-gray-500' },
    { phase: 'En cours', count: 236, color: 'bg-blue-500' },
    { phase: 'En révision', count: 89, color: 'bg-yellow-500' },
    { phase: 'Terminé', count: 803, color: 'bg-green-500' }
  ];

  const recentActivities = [
    { type: 'project', message: 'Nouveau projet "API Gateway" créé', time: '2 min', icon: FolderOpen, color: 'text-blue-600' },
    { type: 'task', message: 'Tâche "Intégration paiement" terminée', time: '15 min', icon: CheckCircle, color: 'text-green-600' },
    { type: 'employee', message: 'Nouvel employé "Marie Dubois" ajouté', time: '1h', icon: UserCheck, color: 'text-purple-600' },
    { type: 'complaint', message: 'Réclamation #1234 résolue', time: '2h', icon: Shield, color: 'text-indigo-600' },
    { type: 'team', message: 'Équipe "Frontend" mise à jour', time: '3h', icon: Users, color: 'text-orange-600' },
    { type: 'project', message: 'Projet "CRM" progression 85%', time: '4h', icon: TrendingUp, color: 'text-green-600' }
  ];

  const departmentStats = [
    { name: 'Développement', employees: 45, projects: 12, completion: 78 },
    { name: 'Design', employees: 18, projects: 8, completion: 85 },
    { name: 'Marketing', employees: 22, projects: 6, completion: 92 },
    { name: 'Ventes', employees: 31, projects: 4, completion: 67 },
    { name: 'Support', employees: 15, projects: 3, completion: 88 }
  ];

  const monthlyProgress = [
    { month: 'Jan', completed: 45, started: 12 },
    { month: 'Fév', completed: 52, started: 18 },
    { month: 'Mar', completed: 38, started: 15 },
    { month: 'Avr', completed: 61, started: 22 },
    { month: 'Mai', completed: 49, started: 19 }
  ];

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Super Admin</h1>
        <p className="text-gray-600">Vue d'ensemble complète de la plateforme et des projets</p>
      </div>

      {/* Statistiques Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Employés Actifs</p>
              <p className="text-2xl font-bold text-gray-900">{globalStats.activeEmployees}</p>
              <p className="text-xs text-gray-500">sur {globalStats.totalEmployees} total</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
              <FolderOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Projets Actifs</p>
              <p className="text-2xl font-bold text-gray-900">{globalStats.activeProjects}</p>
              <p className="text-xs text-gray-500">{globalStats.completedProjects} terminés</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tâches Terminées</p>
              <p className="text-2xl font-bold text-gray-900">{globalStats.completedTasks}</p>
              <p className="text-xs text-gray-500">sur {globalStats.totalTasks} total</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <Shield className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Réclamations</p>
              <p className="text-2xl font-bold text-gray-900">{globalStats.pendingComplaints}</p>
              <p className="text-xs text-gray-500">{globalStats.resolvedComplaints} résolues</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques Secondaires */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Équipes Actives</p>
              <p className="text-xl font-bold text-gray-900">{globalStats.activeTeams}</p>
            </div>
            <Building2 className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Administrateurs</p>
              <p className="text-xl font-bold text-gray-900">{globalStats.totalAdmins}</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Taux de Réussite</p>
              <p className="text-xl font-bold text-gray-900">
                {Math.round((globalStats.completedTasks / globalStats.totalTasks) * 100)}%
              </p>
            </div>
            <Target className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tâches en Attente</p>
              <p className="text-xl font-bold text-gray-900">{globalStats.pendingTasks}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Progression des Projets */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Progression des Projets</h2>
          <TrendingUp className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="space-y-4">
          {projectProgress.map((project, index) => (
            <div key={index} className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Progression</span>
                    <span className="font-semibold text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  {project.dueDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Graphiques et Statistiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Répartition des Tâches par Phase */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Tâches par Phase</h2>
            <PieChart className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="space-y-4">
            {tasksByPhase.map((phase, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${phase.color}`}></div>
                  <span className="font-semibold text-gray-700">{phase.phase}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900">{phase.count}</span>
                  <div className="text-xs text-gray-500">
                    {Math.round((phase.count / globalStats.totalTasks) * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistiques par Département */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Performance par Département</h2>
            <BarChart3 className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                  <span className="text-sm text-gray-600">{dept.completion}% terminé</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Employés: </span>
                    <span className="font-semibold">{dept.employees}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Projets: </span>
                    <span className="font-semibold">{dept.projects}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${dept.completion}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progression Mensuelle */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Progression Mensuelle</h2>
          <Activity className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="grid grid-cols-5 gap-4">
          {monthlyProgress.map((month, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-50 rounded-lg p-4 mb-2">
                <div className="text-lg font-bold text-gray-900">{month.completed}</div>
                <div className="text-xs text-gray-600">Terminées</div>
                <div className="mt-2 text-sm font-semibold text-indigo-600">{month.started}</div>
                <div className="text-xs text-gray-600">Démarrées</div>
              </div>
              <div className="text-sm font-semibold text-gray-700">{month.month}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Activités Récentes */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Activités Récentes</h2>
          <FileText className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`p-2 rounded-lg bg-gray-100`}>
                <activity.icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">Il y a {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alertes et Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h3 className="text-lg font-bold text-red-900">Alertes Importantes</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white bg-opacity-50 rounded-lg p-3">
              <p className="text-sm font-semibold text-red-800">3 projets en retard</p>
              <p className="text-xs text-red-600">Nécessitent une attention immédiate</p>
            </div>
            <div className="bg-white bg-opacity-50 rounded-lg p-3">
              <p className="text-sm font-semibold text-red-800">5 réclamations non résolues</p>
              <p className="text-xs text-red-600">Depuis plus de 48h</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-bold text-green-900">Réussites du Mois</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white bg-opacity-50 rounded-lg p-3">
              <p className="text-sm font-semibold text-green-800">17 projets terminés</p>
              <p className="text-xs text-green-600">+12% par rapport au mois dernier</p>
            </div>
            <div className="bg-white bg-opacity-50 rounded-lg p-3">
              <p className="text-sm font-semibold text-green-800">892 tâches accomplies</p>
              <p className="text-xs text-green-600">Taux de réussite de 69%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}