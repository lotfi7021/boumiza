import { FolderKanban, Calendar, Users } from 'lucide-react';

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

interface ProjectCardProps {
  project: Project;
  onViewDetails?: () => void;
  onManageTasks?: () => void;
}

export default function ProjectCard({ project, onViewDetails, onManageTasks }: ProjectCardProps) {
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

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-indigo-300 transition-all hover:shadow-md">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <FolderKanban className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">{project.description}</p>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(project.status)}`}>
                {getStatusLabel(project.status)}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getPriorityColor(project.priority)}`}>
                {getPriorityLabel(project.priority)}
              </span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Progression</span>
            <span className="font-semibold text-gray-900">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Échéance</p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(project.endDate).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Équipe</p>
              <p className="text-sm font-semibold text-gray-900">{project.teamMembers} membres</p>
            </div>
          </div>
        </div>

        {/* Budget & Tasks */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-500 mb-1">Budget</p>
            <p className="text-sm font-semibold text-gray-900">
              {project.spentBudget.toLocaleString()}€ / {project.budget.toLocaleString()}€
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Tâches</p>
            <p className="text-sm font-semibold text-gray-900">
              {project.tasksCompleted} / {project.totalTasks}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button 
            onClick={onViewDetails}
            className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors font-semibold text-sm"
          >
            Voir Détails
          </button>
          <button 
            onClick={onManageTasks}
            className="flex-1 px-4 py-2 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-sm"
          >
            Gérer Tâches
          </button>
        </div>
      </div>
    </div>
  );
}
