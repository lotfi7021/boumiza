import { X, Mail, Phone, User as UserIcon, Calendar, Clock, Building } from 'lucide-react';
import { User, USER_ROLE_LABELS, USER_ROLE_COLORS, USER_STATUS_LABELS, USER_STATUS_COLORS } from '../../types/user';
import { useUserContext } from '../../contexts/UserContext';
import { useError } from '../../hooks/useError';

interface UserDetailsProps {
  user: User;
  onClose: () => void;
  onEdit: () => void;
}

export default function UserDetails({ user, onClose, onEdit }: UserDetailsProps) {
  const { deleteUser, updateUserStatus } = useUserContext();
  const { error, handleError } = useError();

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      const success = await deleteUser(user.id);
      if (success) {
        onClose();
      }
    }
  };

  const handleStatusChange = async (newStatus: 'active' | 'inactive' | 'suspended') => {
    await updateUserStatus(user.id, newStatus);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Détails de l'utilisateur</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-2xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">ID: {user.id}</p>
              <div className="flex gap-2 mt-2">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                  USER_ROLE_COLORS[user.role]
                }`}>
                  <UserIcon className="h-3 w-3" />
                  {USER_ROLE_LABELS[user.role]}
                </span>
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                  USER_STATUS_COLORS[user.status]
                }`}>
                  {USER_STATUS_LABELS[user.status]}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Informations de contact
            </h4>
            <div className="space-y-3 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Téléphone</p>
                  <p className="text-sm font-medium text-gray-900">{user.phone}</p>
                </div>
              </div>
              {user.company && (
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Entreprise</p>
                    <p className="text-sm font-medium text-gray-900">{user.company}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Activité
            </h4>
            <div className="space-y-3 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Date d'inscription</p>
                  <p className="text-sm font-medium text-gray-900">{user.createdAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Dernière connexion</p>
                  <p className="text-sm font-medium text-gray-900">{user.lastLogin}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
          {error && (
            <div className="flex-1 text-sm text-red-600 bg-red-50 p-2 rounded">
              {error.message}
            </div>
          )}
          
          {/* Status Actions */}
          {user.status === 'active' && (
            <>
              <button
                onClick={() => handleStatusChange('inactive')}
                className="px-4 py-2 border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
              >
                Désactiver
              </button>
              <button
                onClick={() => handleStatusChange('suspended')}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                Suspendre
              </button>
            </>
          )}
          
          {user.status === 'inactive' && (
            <button
              onClick={() => handleStatusChange('active')}
              className="px-4 py-2 border border-green-300 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              Activer
            </button>
          )}
          
          {user.status === 'suspended' && (
            <button
              onClick={() => handleStatusChange('active')}
              className="px-4 py-2 border border-green-300 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              Réactiver
            </button>
          )}

          <button
            onClick={handleDelete}
            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            Supprimer
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
}