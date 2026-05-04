import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X, Briefcase, Users, Eye } from 'lucide-react';

interface Position {
  id: string;
  name: string;
  description: string;
  department: string;
  level: 'junior' | 'intermediate' | 'senior' | 'expert';
  employeeCount: number;
  createdAt: string;
}

export default function Positions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [newPosition, setNewPosition] = useState({
    name: '',
    description: '',
    department: '',
    level: 'intermediate' as 'junior' | 'intermediate' | 'senior' | 'expert'
  });

  // FAKE DATA
  const [positions, setPositions] = useState<Position[]>([
    {
      id: '1',
      name: 'Développeur Frontend',
      description: 'Développement d\'interfaces utilisateur avec React, Vue ou Angular',
      department: 'Développement',
      level: 'intermediate',
      employeeCount: 12,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Développeur Backend',
      description: 'Développement d\'APIs et services backend',
      department: 'Développement',
      level: 'intermediate',
      employeeCount: 10,
      createdAt: '2024-01-15'
    },
    {
      id: '3',
      name: 'Chef de Projet',
      description: 'Gestion et coordination de projets informatiques',
      department: 'Management',
      level: 'senior',
      employeeCount: 5,
      createdAt: '2024-01-20'
    },
    {
      id: '4',
      name: 'Designer UX/UI',
      description: 'Conception d\'expériences et interfaces utilisateur',
      department: 'Design',
      level: 'intermediate',
      employeeCount: 8,
      createdAt: '2024-01-18'
    },
   
  ]);

  const departments = [
    'Développement',
    'Design',
    'Infrastructure',
    'Qualité',
    'Analyse',
    'Management',
    'Data',
    'Marketing',
    'RH',
    'Finance'
  ];

  const getLevelLabel = (level: string) => {
    const labels: Record<string, string> = {
      junior: 'Junior',
      intermediate: 'Intermédiaire',
      senior: 'Senior',
      expert: 'Expert'
    };
    return labels[level] || level;
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      junior: 'bg-green-100 text-green-700',
      intermediate: 'bg-blue-100 text-blue-700',
      senior: 'bg-purple-100 text-purple-700',
      expert: 'bg-orange-100 text-orange-700'
    };
    return colors[level] || 'bg-gray-100 text-gray-700';
  };

  const filteredPositions = positions.filter(position =>
    position.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    position.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    position.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: positions.length,
    totalEmployees: positions.reduce((acc, p) => acc + p.employeeCount, 0),
    departments: new Set(positions.map(p => p.department)).size
  };

  const handleCreatePosition = () => {
    if (!newPosition.name.trim() || !newPosition.department) return;

    const position: Position = {
      id: Date.now().toString(),
      name: newPosition.name,
      description: newPosition.description,
      department: newPosition.department,
      level: newPosition.level,
      employeeCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setPositions([position, ...positions]);
    
    // Reset form
    setNewPosition({
      name: '',
      description: '',
      department: '',
      level: 'intermediate'
    });
    setShowCreateModal(false);
  };

  const handleEditPosition = () => {
    if (!selectedPosition || !newPosition.name.trim() || !newPosition.department) return;

    setPositions(positions.map(p =>
      p.id === selectedPosition.id
        ? {
            ...p,
            name: newPosition.name,
            description: newPosition.description,
            department: newPosition.department,
            level: newPosition.level
          }
        : p
    ));

    setShowEditModal(false);
    setSelectedPosition(null);
    setNewPosition({
      name: '',
      description: '',
      department: '',
      level: 'intermediate'
    });
  };

  const handleDeletePosition = () => {
    if (!selectedPosition) return;
    
    setPositions(positions.filter(p => p.id !== selectedPosition.id));
    setShowDeleteConfirm(false);
    setSelectedPosition(null);
  };

  const openEditModal = (position: Position) => {
    setSelectedPosition(position);
    setNewPosition({
      name: position.name,
      description: position.description,
      department: position.department,
      level: position.level
    });
    setShowEditModal(true);
  };

  const openDeleteConfirm = (position: Position) => {
    setSelectedPosition(position);
    setShowDeleteConfirm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Postes</h1>
          <p className="text-gray-600">Gérez les postes et fonctions de l'entreprise</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
        >
          <Plus className="h-5 w-5" />
          Nouveau Poste
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Postes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Employés</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Départements</p>
              <p className="text-2xl font-bold text-gray-900">{stats.departments}</p>
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
            placeholder="Rechercher un poste..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Positions Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Poste
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Département
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Niveau
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Employés
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date de création
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPositions.map((position) => (
                <tr key={position.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{position.name}</p>
                      <p className="text-sm text-gray-500 line-clamp-1">{position.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{position.department}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getLevelColor(position.level)}`}>
                      {getLevelLabel(position.level)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-semibold text-gray-900">{position.employeeCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">
                      {new Date(position.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedPosition(position);
                          setShowDetailsModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Voir les détails"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => openEditModal(position)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(position)}
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

        {filteredPositions.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Aucun poste trouvé</p>
          </div>
        )}
      </div>

      {/* Modal Créer un Poste */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Nouveau Poste</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewPosition({
                    name: '',
                    description: '',
                    department: '',
                    level: 'intermediate'
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
                  Nom du poste <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newPosition.name}
                  onChange={(e) => setNewPosition({ ...newPosition, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ex: Développeur Frontend"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newPosition.description}
                  onChange={(e) => setNewPosition({ ...newPosition, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Décrivez le poste..."
                />
              </div>

              {/* Département */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Département <span className="text-red-500">*</span>
                </label>
                <select
                  value={newPosition.department}
                  onChange={(e) => setNewPosition({ ...newPosition, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Sélectionnez un département</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Niveau */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Niveau
                </label>
                <select
                  value={newPosition.level}
                  onChange={(e) => setNewPosition({ ...newPosition, level: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="junior">Junior</option>
                  <option value="intermediate">Intermédiaire</option>
                  <option value="senior">Senior</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewPosition({
                    name: '',
                    description: '',
                    department: '',
                    level: 'intermediate'
                  });
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleCreatePosition}
                disabled={!newPosition.name.trim() || !newPosition.department}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Créer le poste
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails du Poste */}
      {showDetailsModal && selectedPosition && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Détails du Poste</h2>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedPosition(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Titre et badges */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{selectedPosition.name}</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(selectedPosition.level)}`}>
                    {getLevelLabel(selectedPosition.level)}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700">
                    {selectedPosition.department}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600">
                  {selectedPosition.description || 'Aucune description fournie'}
                </p>
              </div>

              {/* Informations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500">Employés assignés</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{selectedPosition.employeeCount}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500">Date de création</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(selectedPosition.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer avec actions */}
            <div className="flex items-center justify-end p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedPosition(null);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Modifier un Poste */}
      {showEditModal && selectedPosition && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Modifier le Poste</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedPosition(null);
                  setNewPosition({
                    name: '',
                    description: '',
                    department: '',
                    level: 'intermediate'
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
                  Nom du poste <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newPosition.name}
                  onChange={(e) => setNewPosition({ ...newPosition, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ex: Développeur Frontend"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newPosition.description}
                  onChange={(e) => setNewPosition({ ...newPosition, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Décrivez le poste..."
                />
              </div>

              {/* Département */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Département <span className="text-red-500">*</span>
                </label>
                <select
                  value={newPosition.department}
                  onChange={(e) => setNewPosition({ ...newPosition, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Sélectionnez un département</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Niveau */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Niveau
                </label>
                <select
                  value={newPosition.level}
                  onChange={(e) => setNewPosition({ ...newPosition, level: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="junior">Junior</option>
                  <option value="intermediate">Intermédiaire</option>
                  <option value="senior">Senior</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedPosition(null);
                  setNewPosition({
                    name: '',
                    description: '',
                    department: '',
                    level: 'intermediate'
                  });
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleEditPosition}
                disabled={!newPosition.name.trim() || !newPosition.department}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmation de Suppression */}
      {showDeleteConfirm && selectedPosition && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Confirmer la suppression</h2>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600">
                Êtes-vous sûr de vouloir supprimer le poste <span className="font-semibold">{selectedPosition.name}</span> ?
              </p>
              {selectedPosition.employeeCount > 0 && (
                <p className="text-sm text-orange-600 mt-2">
                  ⚠️ Attention : {selectedPosition.employeeCount} employé(s) sont actuellement assignés à ce poste.
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedPosition(null);
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleDeletePosition}
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
