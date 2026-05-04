import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X, UserCog, Users, Shield } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  code: string;
  description: string;
  permissions: string[];
  userCount: number;
  color: string;
  createdAt: string;
}

export default function Roles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [newRole, setNewRole] = useState({
    name: '',
    code: '',
    description: '',
    permissions: [] as string[],
    color: 'blue'
  });

  // Liste des permissions disponibles
  const availablePermissions = [
    { id: 'read_users', label: 'Lire les utilisateurs' },
    { id: 'write_users', label: 'Modifier les utilisateurs' },
    { id: 'delete_users', label: 'Supprimer les utilisateurs' },
    { id: 'read_projects', label: 'Lire les projets' },
    { id: 'write_projects', label: 'Modifier les projets' },
    { id: 'delete_projects', label: 'Supprimer les projets' },
    { id: 'read_reports', label: 'Lire les rapports' },
    { id: 'write_reports', label: 'Créer les rapports' },
    { id: 'manage_settings', label: 'Gérer les paramètres' },
    { id: 'manage_roles', label: 'Gérer les rôles' },
    { id: 'manage_departments', label: 'Gérer les départements' },
    { id: 'manage_complaints', label: 'Gérer les réclamations' }
  ];

  // FAKE DATA
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'Super Administrateur',
      code: 'SUPER_ADMIN',
      description: 'Accès complet à toutes les fonctionnalités du système',
      permissions: availablePermissions.map(p => p.id),
      userCount: 2,
      color: 'red',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Administrateur',
      code: 'ADMIN',
      description: 'Gestion des utilisateurs et des projets',
      permissions: ['read_users', 'write_users', 'read_projects', 'write_projects', 'read_reports', 'write_reports'],
      userCount: 8,
      color: 'indigo',
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      name: 'Chef de Projet',
      code: 'PROJECT_MANAGER',
      description: 'Gestion des projets et des équipes',
      permissions: ['read_users', 'read_projects', 'write_projects', 'read_reports', 'write_reports'],
      userCount: 15,
      color: 'blue',
      createdAt: '2024-01-01'
    },
    {
      id: '4',
      name: 'Employé',
      code: 'EMPLOYEE',
      description: 'Accès de base aux fonctionnalités',
      permissions: ['read_projects', 'read_reports'],
      userCount: 45,
      color: 'green',
      createdAt: '2024-01-01'
    },
   
  ]);

  const colorOptions = [
    { value: 'gray', label: 'Gris', class: 'bg-gray-100 text-gray-700' },
    { value: 'red', label: 'Rouge', class: 'bg-red-100 text-red-700' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-100 text-orange-700' },
    { value: 'yellow', label: 'Jaune', class: 'bg-yellow-100 text-yellow-700' },
    { value: 'green', label: 'Vert', class: 'bg-green-100 text-green-700' },
    { value: 'blue', label: 'Bleu', class: 'bg-blue-100 text-blue-700' },
    { value: 'indigo', label: 'Indigo', class: 'bg-indigo-100 text-indigo-700' },
    { value: 'purple', label: 'Violet', class: 'bg-purple-100 text-purple-700' },
    { value: 'pink', label: 'Rose', class: 'bg-pink-100 text-pink-700' }
  ];

  const getColorClass = (color: string) => {
    const colorOption = colorOptions.find(c => c.value === color);
    return colorOption?.class || 'bg-gray-100 text-gray-700';
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: roles.length,
    totalUsers: roles.reduce((acc, r) => acc + r.userCount, 0)
  };

  const handleCreateRole = () => {
    if (!newRole.name.trim() || !newRole.code.trim()) return;

    const role: Role = {
      id: Date.now().toString(),
      name: newRole.name,
      code: newRole.code.toUpperCase().replace(/\s+/g, '_'),
      description: newRole.description,
      permissions: newRole.permissions,
      userCount: 0,
      color: newRole.color,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setRoles([...roles, role]);
    
    // Reset form
    setNewRole({
      name: '',
      code: '',
      description: '',
      permissions: [],
      color: 'blue'
    });
    setShowCreateModal(false);
  };

  const handleEditRole = () => {
    if (!selectedRole || !newRole.name.trim() || !newRole.code.trim()) return;

    setRoles(roles.map(r =>
      r.id === selectedRole.id
        ? {
            ...r,
            name: newRole.name,
            code: newRole.code.toUpperCase().replace(/\s+/g, '_'),
            description: newRole.description,
            permissions: newRole.permissions,
            color: newRole.color
          }
        : r
    ));

    setShowEditModal(false);
    setSelectedRole(null);
    setNewRole({
      name: '',
      code: '',
      description: '',
      permissions: [],
      color: 'blue'
    });
  };

  const handleDeleteRole = () => {
    if (!selectedRole) return;
    
    setRoles(roles.filter(r => r.id !== selectedRole.id));
    setShowDeleteConfirm(false);
    setSelectedRole(null);
  };

  const openEditModal = (role: Role) => {
    setSelectedRole(role);
    setNewRole({
      name: role.name,
      code: role.code,
      description: role.description,
      permissions: role.permissions,
      color: role.color
    });
    setShowEditModal(true);
  };

  const openDeleteConfirm = (role: Role) => {
    setSelectedRole(role);
    setShowDeleteConfirm(true);
  };

  const togglePermission = (permissionId: string) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Rôles</h1>
          <p className="text-gray-600">Gérez les rôles et permissions des utilisateurs</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
        >
          <Plus className="h-5 w-5" />
          Nouveau Rôle
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <UserCog className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Rôles</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Utilisateurs Assignés</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un rôle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Roles Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Utilisateurs
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRoles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getColorClass(role.color)}`}>
                      {role.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-gray-900">{role.code}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{role.description}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-semibold text-gray-900">{role.permissions.length}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      {role.userCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(role)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(role)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRoles.length === 0 && (
          <div className="text-center py-12">
            <UserCog className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Aucun rôle trouvé</p>
          </div>
        )}
      </div>

      {/* Modal Créer un Rôle */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Nouveau Rôle</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewRole({
                    name: '',
                    code: '',
                    description: '',
                    permissions: [],
                    color: 'blue'
                  });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              {/* Nom */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom du rôle <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ex: Administrateur"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Décrivez le rôle..."
                />
              </div>

              {/* Couleur */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Couleur
                </label>
                <select
                  value={newRole.color}
                  onChange={(e) => setNewRole({ ...newRole, color: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {colorOptions.map(color => (
                    <option key={color.value} value={color.value}>{color.label}</option>
                  ))}
                </select>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getColorClass(newRole.color)}`}>
                    Aperçu
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewRole({
                    name: '',
                    code: '',
                    description: '',
                    permissions: [],
                    color: 'blue'
                  });
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleCreateRole}
                disabled={!newRole.name.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Créer le rôle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Modifier un Rôle */}
      {showEditModal && selectedRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Modifier le Rôle</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedRole(null);
                  setNewRole({
                    name: '',
                    code: '',
                    description: '',
                    permissions: [],
                    color: 'blue'
                  });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              {/* Nom */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom du rôle <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ex: Administrateur"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Décrivez le rôle..."
                />
              </div>

              {/* Couleur */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Couleur
                </label>
                <select
                  value={newRole.color}
                  onChange={(e) => setNewRole({ ...newRole, color: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {colorOptions.map(color => (
                    <option key={color.value} value={color.value}>{color.label}</option>
                  ))}
                </select>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getColorClass(newRole.color)}`}>
                    Aperçu
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedRole(null);
                  setNewRole({
                    name: '',
                    code: '',
                    description: '',
                    permissions: [],
                    color: 'blue'
                  });
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleEditRole}
                disabled={!newRole.name.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmation de Suppression */}
      {showDeleteConfirm && selectedRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Confirmer la suppression</h2>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600">
                Êtes-vous sûr de vouloir supprimer le rôle <span className="font-semibold">{selectedRole.name}</span> ?
              </p>
              {selectedRole.userCount > 0 && (
                <p className="text-sm text-orange-600 mt-2">
                  ⚠️ Attention : {selectedRole.userCount} utilisateur(s) ont actuellement ce rôle.
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedRole(null);
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteRole}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
