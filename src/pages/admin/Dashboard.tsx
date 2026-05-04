import {
  Users,
  FolderKanban,
  AlertCircle,
  UsersRound,
  Calendar,
  MoreHorizontal,
  TrendingUp,
  Clock,
  CheckCircle,
  Target,
  BarChart3,
  Activity
} from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

const stats = [
  {
    title: 'Employés actifs',
    value: '48',
    change: '+3 ce mois',
    trend: 'up',
    icon: Users,
    color: 'indigo'
  },
  {
    title: 'Projets en cours',
    value: '12',
    change: '5 terminés',
    trend: 'up',
    icon: FolderKanban,
    color: 'blue'
  },
  {
    title: 'Tâches terminées',
    value: '342',
    change: '+28 cette semaine',
    trend: 'up',
    icon: CheckCircle,
    color: 'green'
  },
  {
    title: 'Taux de réussite',
    value: '94%',
    change: '+2% ce mois',
    trend: 'up',
    icon: Target,
    color: 'purple'
  }
];

// Données détaillées pour les tâches par mois
const tasksData = [
  { month: 'Jan', completees: 45, enCours: 23, enRetard: 5, planifiees: 12 },
  { month: 'Fév', completees: 52, enCours: 28, enRetard: 3, planifiees: 15 },
  { month: 'Mar', completees: 48, enCours: 25, enRetard: 7, planifiees: 18 },
  { month: 'Avr', completees: 61, enCours: 32, enRetard: 4, planifiees: 20 },
  { month: 'Mai', completees: 55, enCours: 29, enRetard: 6, planifiees: 16 },
  { month: 'Jun', completees: 67, enCours: 35, enRetard: 2, planifiees: 22 }
];

// Données pour le graphique des projets par statut
const projectStatusData = [
  { name: 'En cours', value: 12, color: '#3B82F6' },
  { name: 'Planification', value: 5, color: '#8B5CF6' },
  { name: 'En pause', value: 3, color: '#F59E0B' },
  { name: 'Terminés', value: 8, color: '#10B981' }
];

// Données pour la performance des équipes
const teamPerformanceData = [
  { team: 'Frontend', taches: 45, completees: 42, enCours: 3, performance: 93 },
  { team: 'Backend', taches: 38, completees: 35, enCours: 3, performance: 92 },
  { team: 'Mobile', taches: 32, completees: 28, enCours: 4, performance: 88 },
  { team: 'Data', taches: 25, completees: 22, enCours: 3, performance: 88 },
  { team: 'DevOps', taches: 20, completees: 19, enCours: 1, performance: 95 }
];

// Données pour l'évolution des performances
const performanceEvolutionData = [
  { week: 'S1', productivite: 85, qualite: 88, delais: 92 },
  { week: 'S2', productivite: 87, qualite: 90, delais: 89 },
  { week: 'S3', productivite: 89, qualite: 87, delais: 94 },
  { week: 'S4', productivite: 92, qualite: 93, delais: 91 },
  { week: 'S5', productivite: 88, qualite: 91, delais: 96 },
  { week: 'S6', productivite: 94, qualite: 95, delais: 93 }
];

// Activités récentes
const recentActivities = [
  {
    id: 1,
    type: 'project',
    title: 'Projet "Refonte E-commerce" - 85% terminé',
    description: 'Livraison prévue dans 2 semaines',
    user: 'Équipe Frontend',
    time: 'Il y a 1h',
    icon: FolderKanban,
    color: 'blue'
  },
  {
    id: 2,
    type: 'task',
    title: '15 tâches terminées aujourd\'hui',
    description: 'Performance équipe Backend excellente',
    user: 'Équipe Backend',
    time: 'Il y a 2h',
    icon: CheckCircle,
    color: 'green'
  },
  {
    id: 3,
    type: 'milestone',
    title: 'Jalon "API Gateway" atteint',
    description: '90% du projet terminé avec succès',
    user: 'Équipe Infrastructure',
    time: 'Il y a 4h',
    icon: Target,
    color: 'purple'
  },
  {
    id: 4,
    type: 'alert',
    title: 'Retard détecté - Projet Mobile',
    description: 'Intervention nécessaire sur les délais',
    user: 'System Alert',
    time: 'Il y a 6h',
    icon: AlertCircle,
    color: 'yellow'
  }
];

// Projets récents avec plus de détails
const recentProjects = [
  {
    id: '1',
    name: 'Refonte Site E-commerce',
    status: 'in_progress',
    progress: 85,
    team: 'Équipe Frontend (6 dev)',
    dueDate: '2026-05-15',
    tasksTotal: 45,
    tasksCompleted: 38,
    budget: 95,
    priority: 'high'
  },
  {
    id: '2',
    name: 'Application Mobile Banking',
    status: 'in_progress',
    progress: 65,
    team: 'Équipe Mobile (4 dev)',
    dueDate: '2026-06-01',
    tasksTotal: 32,
    tasksCompleted: 21,
    budget: 88,
    priority: 'high'
  },
  {
    id: '3',
    name: 'Dashboard Analytics',
    status: 'planning',
    progress: 45,
    team: 'Équipe Data (3 dev)',
    dueDate: '2026-05-20',
    tasksTotal: 25,
    tasksCompleted: 11,
    budget: 92,
    priority: 'medium'
  },
  {
    id: '4',
    name: 'API Gateway',
    status: 'in_progress',
    progress: 90,
    team: 'Équipe Infrastructure (2 dev)',
    dueDate: '2026-05-10',
    tasksTotal: 20,
    tasksCompleted: 18,
    budget: 78,
    priority: 'high'
  }
];

const statusColors = {
  in_progress: 'bg-blue-100 text-blue-700',
  planning: 'bg-purple-100 text-purple-700',
  on_hold: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-green-100 text-green-700'
};

const statusLabels = {
  in_progress: 'En cours',
  planning: 'Planification',
  on_hold: 'En pause',
  completed: 'Terminé'
};

const priorityColors = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700'
};

const priorityLabels = {
  high: 'Haute',
  medium: 'Moyenne',
  low: 'Basse'
};

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord Admin</h1>
          <p className="text-gray-500">Vue d'ensemble des projets, tâches et performances des équipes</p>
        </div>
       
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${
                stat.color === 'indigo' ? 'bg-indigo-100' :
                stat.color === 'blue' ? 'bg-blue-100' :
                stat.color === 'green' ? 'bg-green-100' : 'bg-purple-100'
              }`}>
                <stat.icon className={`h-6 w-6 ${
                  stat.color === 'indigo' ? 'text-indigo-600' :
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' : 'text-purple-600'
                }`} />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500 font-semibold">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 - Tâches et Performance */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tasks Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Statistiques détaillées des tâches</h2>
              <p className="text-sm text-gray-500">Évolution complète sur les 6 derniers mois</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-xl">
              <MoreHorizontal className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tasksData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="completees" fill="#10B981" name="Complétées" radius={[4, 4, 0, 0]} />
                <Bar dataKey="enCours" fill="#3B82F6" name="En cours" radius={[4, 4, 0, 0]} />
                <Bar dataKey="enRetard" fill="#F59E0B" name="En retard" radius={[4, 4, 0, 0]} />
                <Bar dataKey="planifiees" fill="#8B5CF6" name="Planifiées" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Evolution */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Évolution Performance</h2>
              <p className="text-sm text-gray-500">6 dernières semaines</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceEvolutionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="week" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px'
                  }}
                />
                <Line type="monotone" dataKey="productivite" stroke="#3B82F6" strokeWidth={2} name="Productivité" />
                <Line type="monotone" dataKey="qualite" stroke="#10B981" strokeWidth={2} name="Qualité" />
                <Line type="monotone" dataKey="delais" stroke="#8B5CF6" strokeWidth={2} name="Délais" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 - Projets et Équipes */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Project Status Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Répartition des projets</h2>
              <p className="text-sm text-gray-500">Statut actuel de tous les projets</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {projectStatusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm font-semibold text-gray-600">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Performance */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Performance des équipes</h2>
              <p className="text-sm text-gray-500">Taux de réussite par équipe</p>
            </div>
          </div>
          <div className="space-y-4">
            {teamPerformanceData.map((team) => (
              <div key={team.team} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <Users className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{team.team}</p>
                      <p className="text-xs text-gray-500">{team.completees}/{team.taches} tâches</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{team.performance}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full"
                    style={{ width: `${team.performance}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Tables Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Detailed Projects */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Progression détaillée des projets</h2>
            <a href="/app/projects" className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
              Voir tout
            </a>
          </div>
          <div className="divide-y divide-gray-100">
            {recentProjects.map((project) => (
              <div key={project.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <FolderKanban className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{project.name}</p>
                      <p className="text-sm text-gray-500">{project.team}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      priorityColors[project.priority as keyof typeof priorityColors]
                    }`}>
                      {priorityLabels[project.priority as keyof typeof priorityLabels]}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      statusColors[project.status as keyof typeof statusColors]
                    }`}>
                      {statusLabels[project.status as keyof typeof statusLabels]}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-semibold">Progression</span>
                    <span className="font-bold text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Tâches: {project.tasksCompleted}/{project.tasksTotal}</span>
                    <span>Budget: {project.budget}%</span>
                    <span>Échéance: {new Date(project.dueDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Activité récente des projets</h2>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
              Voir tout
            </a>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-4 flex items-start gap-4 hover:bg-gray-50">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  activity.color === 'blue' ? 'bg-blue-100' :
                  activity.color === 'green' ? 'bg-green-100' :
                  activity.color === 'purple' ? 'bg-purple-100' : 'bg-yellow-100'
                }`}>
                  <activity.icon className={`h-5 w-5 ${
                    activity.color === 'blue' ? 'text-blue-600' :
                    activity.color === 'green' ? 'text-green-600' :
                    activity.color === 'purple' ? 'text-purple-600' : 'text-yellow-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600 font-semibold">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-500 font-semibold">{activity.user}</p>
                    <span className="text-xs text-gray-400">•</span>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}