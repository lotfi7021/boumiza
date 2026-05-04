import { CheckSquare, Circle, Clock } from 'lucide-react';

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

interface TaskItemProps {
  task: Task;
  onEdit?: () => void;
}

export default function TaskItem({ task, onEdit }: TaskItemProps) {
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

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-indigo-300 transition-all hover:shadow-sm">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="mt-1">
            {task.status === 'completed' ? (
              <CheckSquare className="h-6 w-6 text-green-600" />
            ) : (
              <Circle className="h-6 w-6 text-gray-400" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{task.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(task.status)}`}>
                {getStatusLabel(task.status)}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getPriorityColor(task.priority)}`}>
                {getPriorityLabel(task.priority)}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-semibold">
                {task.projectName}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <span className="font-semibold">Assigné à:</span>
                <span>{task.assignedTo}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold">Temps:</span>
                <span>{task.actualHours || 0}h / {task.estimatedHours}h</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={onEdit}
              className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors font-semibold text-sm"
            >
              Modifier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
