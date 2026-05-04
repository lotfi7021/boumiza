import { X, Mail, Phone, Shield, Calendar, Clock, User } from 'lucide-react';
import { Admin, ROLE_LABELS, ROLE_COLORS, STATUS_LABELS, STATUS_COLORS } from '../../types/admin';
import { useAdminContext } from '../../contexts/AdminContext';
import { useError } from '../../hooks/useError';

interface AdminDetailsProps {
  admin: Admin;
  onClose: () => void;
  onEdit: () => void;
}

export default function AdminDetails({ admin, onClose, onEdit }: AdminDetailsProps) {
  const { deleteAdmin, toggleAdminStatus } = useAdminContext();
  const { error, handleError } = useError();

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet administrateur ?')) {
      const success = await deleteAdmin(admin.id);
      if (success) {
        onClose();
      }
    }
  };

  const handleToggleStatus = async () => {
    await toggleAdminStatus(admin.id);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Détails de l'administrateur</h2>
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
            <div className="h-20 w-20 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 font-semibold text-2xl">
                {admin.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{admin.name}</h3>
              <p className="text-sm text-gray-500">ID: {admin.id}</p>
              <div className="flex gap-2 mt-2">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                  ROLE_COLORS[admin.role]
                }`}>
                  <Shield className="h-3 w-3" />
                  {ROLE_LABELS[admin.role]}
                </span>
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                  STATUS_COLORS[admin.status]
                }`}>
                  {STATUS_LABELS[admin.status]}
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
                  <p className="text-sm font-medium text-gray-900">{admin.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Téléphone</p>
                  <p className="text-sm font-medium text-gray-900">{admin.phone}</p>
                </div>
              </div>
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
                  <p className="text-xs text-gray-500">Date de création</p>
                  <p className="text-sm font-medium text-gray-900">{admin.createdAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Dernière connexion</p>
                  <p className="text-sm font-medium text-gray-900">{admin.lastLogin}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Permissions
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-2">
                {admin.role === 'super_admin' && (
                  <>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="h-2 w-2 bg-green-500 rounded-full" />
                      Accès complet au système
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="h-2 w-2 bg-green-500 rounded-full" />
                      Gestion des administrateurs
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="h-2 w-2 bg-green-500 rounded-full" />
                      Configuration système
                    </div>
                  </>
                )}
                {admin.role === 'admin' && (
                  <>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="h-2 w-2 bg-green-500 rounded-full" />
                      Gestion des utilisateurs
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="h-2 w-2 bg-green-500 rounded-full" />
                      Gestion des contenus
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="h-2 w-2 bg-green-500 rounded-full" />
                      Rapports et statistiques
                    </div>
                  </>
                )}
                {admin.role === 'moderator' && (
                  <>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="h-2 w-2 bg-green-500 rounded-full" />
                      Modération des contenus
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="h-2 w-2 bg-green-500 rounded-full" />
                      Gestion des commentaires
                    </div>
                  </>
                )}
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
          <button
            onClick={handleToggleStatus}
            className={`px-4 py-2 border rounded-lg transition-colors ${
              admin.status === 'active' 
                ? 'border-orange-300 text-orange-600 hover:bg-orange-50'
                : 'border-green-300 text-green-600 hover:bg-green-50'
            }`}
          >
            {admin.status === 'active' ? 'Désactiver' : 'Activer'}
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            Supprimer
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
}
