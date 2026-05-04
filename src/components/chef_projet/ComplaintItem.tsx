import { AlertCircle, User, Shield } from 'lucide-react';

interface Complaint {
  id: string;
  type: 'employee_to_admin' | 'employee_to_employee' | 'admin';
  title: string;
  description: string;
  submittedBy: string;
  submittedByEmail: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  resolvedAt?: string;
}

interface ComplaintItemProps {
  complaint: Complaint;
  onHandle?: () => void;
  onViewDetails?: () => void;
}

export default function ComplaintItem({ complaint, onHandle, onViewDetails }: ComplaintItemProps) {
  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'En attente',
      in_progress: 'En cours',
      resolved: 'Résolu',
      closed: 'Fermé'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      in_progress: 'bg-blue-100 text-blue-700',
      resolved: 'bg-green-100 text-green-700',
      closed: 'bg-gray-100 text-gray-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityLabel = (priority: string) => {
    const labels: Record<string, string> = {
      low: 'Faible',
      medium: 'Moyenne',
      high: 'Haute',
      urgent: 'Urgente'
    };
    return labels[priority] || priority;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-blue-100 text-blue-700',
      high: 'bg-orange-100 text-orange-700',
      urgent: 'bg-red-100 text-red-700'
    };
    return colors[priority] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-indigo-300 transition-all hover:shadow-sm">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-100 rounded-xl">
            <AlertCircle className="h-6 w-6 text-indigo-600" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{complaint.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{complaint.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(complaint.status)}`}>
                {getStatusLabel(complaint.status)}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getPriorityColor(complaint.priority)}`}>
                {getPriorityLabel(complaint.priority)}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-semibold">
                {complaint.category}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                {complaint.type === 'employee_to_admin' ? (
                  <>
                    <User className="h-4 w-4" />
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                      Employé → Admin
                    </span>
                  </>
                ) : complaint.type === 'employee_to_employee' ? (
                  <>
                    <User className="h-4 w-4" />
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                      Employé → Employé
                    </span>
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4" />
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-semibold">
                      Administrateur
                    </span>
                  </>
                )}
                <span className="text-gray-400">•</span>
                <span className="font-semibold">{complaint.submittedBy}</span>
                <span className="text-gray-400">•</span>
                <span>{complaint.submittedByEmail}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-400">•</span>
                <span>{new Date(complaint.createdAt).toLocaleDateString('fr-FR')}</span>
              </div>
              {complaint.resolvedAt && (
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">•</span>
                  <span className="text-green-600">
                    Résolu le {new Date(complaint.resolvedAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={onHandle}
              className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors font-semibold text-sm"
            >
              Traiter
            </button>
            <button 
              onClick={onViewDetails}
              className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-sm"
            >
              Détails
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
