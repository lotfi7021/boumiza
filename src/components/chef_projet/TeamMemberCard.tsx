import { Mail, Phone, Trash2 } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  avatar?: string;
  tasksAssigned: number;
  tasksCompleted: number;
  hoursThisWeek: number;
  performance: number;
}

interface TeamMemberCardProps {
  member: TeamMember;
  onViewProfile?: () => void;
  onAssignTask?: () => void;
  onDelete?: () => void;
}

export default function TeamMemberCard({ member, onViewProfile, onAssignTask, onDelete }: TeamMemberCardProps) {
  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 75) return 'text-blue-600';
    if (performance >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getPerformanceBarColor = (performance: number) => {
    if (performance >= 90) return 'bg-green-600';
    if (performance >= 75) return 'bg-blue-600';
    if (performance >= 60) return 'bg-orange-600';
    return 'bg-red-600';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-indigo-300 transition-all hover:shadow-md">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <span className="text-indigo-600 font-bold text-xl">
              {member.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{member.role}</p>
            <span className="inline-block text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-semibold">
              {member.department}
            </span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="h-4 w-4 text-gray-400" />
            <span>{member.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{member.phone}</span>
          </div>
        </div>

        {/* Performance */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Performance</span>
            <span className={`text-sm font-bold ${getPerformanceColor(member.performance)}`}>
              {member.performance}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${getPerformanceBarColor(member.performance)}`}
              style={{ width: `${member.performance}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Tâches</p>
            <p className="text-lg font-bold text-gray-900">
              {member.tasksCompleted}/{member.tasksAssigned}
            </p>
          </div>
          <div className="text-center border-l border-r border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Heures</p>
            <p className="text-lg font-bold text-gray-900">{member.hoursThisWeek}h</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Taux</p>
            <p className="text-lg font-bold text-gray-900">
              {Math.round((member.tasksCompleted / member.tasksAssigned) * 100)}%
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button 
            onClick={onViewProfile}
            className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors font-semibold text-sm"
          >
            Voir Profil
          </button>
          <button 
            onClick={onAssignTask}
            className="flex-1 px-4 py-2 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-sm"
          >
            Assigner Tâche
          </button>
          {onDelete && (
            <button 
              onClick={onDelete}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-semibold text-sm"
              title="Retirer du projet"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
