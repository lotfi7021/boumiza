import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X, Shield, TrendingUp } from 'lucide-react';

interface Level {
  id: string;
  name: string;
  description: string;
  order: number;
  color: string;
  positionCount: number;
  createdAt: string;
}

export default function Levels() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [newLevel, setNewLevel] = useState({
    name: '',
    description: '',
    order: 1,
    color: 'blue'
  });

  // FAKE DATA
  const [levels, setLevels] = useState<Level[]>([
    {
      id: '1',
      name: 'Junior',
      description: 'Niveau débutant, 0-2 ans d\'expérience',
      order: 1,
      color: 'green',
      positionCount: 15,
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      name: 'Intermédiaire',
      description: 'Niveau intermédiaire, 2-5 ans d\'expérience',
      order: 2,
      color: 'blue',
      positionCount: 28,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'Senior',
      description: 'Niveau senior, 5-10 ans d\'expérience',
      order: 3,
      color: 'purple',
      positionCount: 18,
      createdAt: '2024-01-10'
    },
    {
      id: '4',
      name: 'Expert',
      description: 'Niveau expert, plus de 10 ans d\'expérience',
      order: 4,
      color: 'orange',
      positionCount: 12,
      createdAt: '2024-01-10'
    }
  ]);

  const colorOptions = [
    { value: 'gray', label: 'Gris', class: 'bg-gray-100 text-gray-700' },
    { value: 'green', label: 'Vert', class: 'bg-green-100 text-green-700' },
    { value: 'blue', label: 'Bleu', class: 'bg-blue-100 text-blue-700' },
    { value: 'purple', label: 'Violet', class: 'bg-purple-100 text-purple-700' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-100 text-orange-700' },
    { value: 'red', label: 'Rouge', class: 'bg-red-100 text-red-700' },
    { value: 'yellow', label: 'Jaune', class: 'bg-yellow-100 text-yellow-700' },
    { value: 'pink', label: 'Rose', class: 'bg-pink-100 text-pink-700' }
  ];

  const getColorClass = (color: string) => {
    const colorOption = colorOptions.find(c => c.value === color);
    return colorOption?.class || 'bg-gray-100 text-gray-700';
  };

  const filteredLevels = levels
    .filter(level =>
      level.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      level.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.order - b.order);

  const stats = {
    total: levels.length,
    totalPositions: levels.reduce((acc, l) => acc + l.positionCount, 0)
  };

  const handleCreateLevel = () => {
    if (!newLevel.name.trim()) return;

    const level: Level = {
      id: Date.now().toString(),
      name: newLevel.name,
      description: newLevel.description,
      order: newLevel.order,
      color: newLevel.color,
      positionCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setLevels([...levels, level]);
    
    // Reset form
    setNewLevel({
      name: '',
      description: '',
      order: levels.length + 1,
      color: 'blue'
    });
    setShowCreateModal(false);
  };

  const handleEditLevel = () => {
    if (!selectedLevel || !newLevel.name.trim()) return;

    setLevels(levels.map(l =>
      l.id === selectedLevel.id
        ? {
            ...l,
            name: newLevel.name,
            description: newLevel.description,
            order: newLevel.order,
            color: newLevel.color
          }
        : l
    ));

    setShowEditModal(false);
    setSelectedLevel(null);
    setNewLevel({
      name: '',
      description: '',
      order: 1,
      color: 'blue'
    });
  };

  const handleDeleteLevel = () => {
    if (!selectedLevel) return;
    
    setLevels(levels.filter(l => l.id !== selectedLevel.id));
    setShowDeleteConfirm(false);
    setSelectedLevel(null);
  };

  const openEditModal = (level: Level) => {
    setSelectedLevel(level);
    setNewLevel({
      name: level.name,
      description: level.description,
      order: level.order,
      color: level.color
    });
    setShowEditModal(true);
  };

  const openDeleteConfirm = (level: Level) => {
    setSelectedLevel(level);
    setShowDeleteConfirm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Niveaux</h1>
          <p className="text-gray-600">Gérez les niveaux d'expérience des postes</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
        >
          <Plus className="h-5 w-5" />
          Nouveau Niveau
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Shield className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Niveaux</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Postes Associés</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPositions}</p>
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
            placeholder="Rechercher un niveau..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Levels Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ordre
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Niveau
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Postes
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLevels.map((level) => (
                <tr key={level.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">{level.order}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getColorClass(level.color)}`}>
                      {level.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{level.description}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      {level.positionCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(level)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(level)}
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

        {filteredLevels.length === 0 && (
          <div className="text-center py-12">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Aucun niveau trouvé</p>
          </div>
        )}
      </div>

      {/* Modal Créer un Niveau */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Nouveau Niveau</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewLevel({
                    name: '',
                    description: '',
                    order: levels.length + 1,
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
                  Nom du niveau <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newLevel.name}
                  onChange={(e) => setNewLevel({ ...newLevel, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ex: Junior"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newLevel.description}
                  onChange={(e) => setNewLevel({ ...newLevel, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Décrivez le niveau..."
                />
              </div>

              {/* Ordre */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ordre d'affichage
                </label>
                <input
                  type="number"
                  value={newLevel.order}
                  onChange={(e) => setNewLevel({ ...newLevel, order: Number(e.target.value) })}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Couleur */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Couleur
                </label>
                <select
                  value={newLevel.color}
                  onChange={(e) => setNewLevel({ ...newLevel, color: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {colorOptions.map(color => (
                    <option key={color.value} value={color.value}>{color.label}</option>
                  ))}
                </select>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getColorClass(newLevel.color)}`}>
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
                  setNewLevel({
                    name: '',
                    description: '',
                    order: levels.length + 1,
                    color: 'blue'
                  });
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleCreateLevel}
                disabled={!newLevel.name.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Créer le niveau
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Modifier un Niveau */}
      {showEditModal && selectedLevel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Modifier le Niveau</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedLevel(null);
                  setNewLevel({
                    name: '',
                    description: '',
                    order: 1,
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
                  Nom du niveau <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newLevel.name}
                  onChange={(e) => setNewLevel({ ...newLevel, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ex: Junior"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newLevel.description}
                  onChange={(e) => setNewLevel({ ...newLevel, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Décrivez le niveau..."
                />
              </div>

              {/* Ordre */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ordre d'affichage
                </label>
                <input
                  type="number"
                  value={newLevel.order}
                  onChange={(e) => setNewLevel({ ...newLevel, order: Number(e.target.value) })}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Couleur */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Couleur
                </label>
                <select
                  value={newLevel.color}
                  onChange={(e) => setNewLevel({ ...newLevel, color: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {colorOptions.map(color => (
                    <option key={color.value} value={color.value}>{color.label}</option>
                  ))}
                </select>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getColorClass(newLevel.color)}`}>
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
                  setSelectedLevel(null);
                  setNewLevel({
                    name: '',
                    description: '',
                    order: 1,
                    color: 'blue'
                  });
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleEditLevel}
                disabled={!newLevel.name.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmation de Suppression */}
      {showDeleteConfirm && selectedLevel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Confirmer la suppression</h2>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600">
                Êtes-vous sûr de vouloir supprimer le niveau <span className="font-semibold">{selectedLevel.name}</span> ?
              </p>
              {selectedLevel.positionCount > 0 && (
                <p className="text-sm text-orange-600 mt-2">
                  ⚠️ Attention : {selectedLevel.positionCount} poste(s) utilisent actuellement ce niveau.
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedLevel(null);
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteLevel}
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
