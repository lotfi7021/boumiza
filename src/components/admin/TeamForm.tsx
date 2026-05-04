import { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Team, TeamFormData, DEPARTMENTS } from '../../types/team';
import { useTeamContext } from '../../contexts/TeamContext';

interface TeamFormProps {
  team?: Team | null;
  onClose: () => void;
}

export default function TeamForm({ team, onClose }: TeamFormProps) {
  const { createTeam, updateTeam, teamLeaders } = useTeamContext();
  const [loading, setLoading] = useState(false);
  const [objectives, setObjectives] = useState<string[]>([]);
  const [newObjective, setNewObjective] = useState('');

  const [formData, setFormData] = useState<TeamFormData>({
    name: '',
    description: '',
    department: 'Développement',
    status: 'active',
    teamLeaderId: '',
    objectives: []
  });

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name,
        description: team.description,
        department: team.department,
        status: team.status,
        teamLeaderId: team.teamLeaderId || '',
        objectives: team.objectives || []
      });
      setObjectives(team.objectives || []);
    }
  }, [team]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSubmit = {
        ...formData,
        objectives
      };

      const success = team 
        ? await updateTeam(team.id, dataToSubmit)
        : await createTeam(dataToSubmit);

      if (success) {
        onClose();
      }
    } catch (error) {
      console.error('Error saving team:', error);
    } finally {
      setLoading(false);
    }
  };

  const addObjective = () => {
    if (newObjective.trim() && !objectives.includes(newObjective.trim())) {
      setObjectives([...objectives, newObjective.trim()]);
      setNewObjective('');
    }
  };

  const removeObjective = (objectiveToRemove: string) => {
    setObjectives(objectives.filter(obj => obj !== objectiveToRemove));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {team ? 'Modifier l\'équipe' : 'Nouvelle équipe'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Informations générales</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de l'équipe *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ex: Équipe Développement Frontend"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Description de l'équipe et de ses responsabilités"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Département *
                </label>
                <select
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {DEPARTMENTS.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on_hold">En pause</option>
                </select>
              </div>
            </div>
          </div>

          {/* Team Leader */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Chef d'équipe</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigner un chef d'équipe (optionnel)
              </label>
              <select
                value={formData.teamLeaderId || ''}
                onChange={(e) => setFormData({ ...formData, teamLeaderId: e.target.value || undefined })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Aucun chef d'équipe</option>
                {teamLeaders.map((leader) => (
                  <option key={leader.id} value={leader.id}>
                    {leader.firstName} {leader.lastName} - {leader.department}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Seuls les employés avec le rôle "Chef d'équipe" sont disponibles
              </p>
            </div>
          </div>

          {/* Objectives */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Objectifs de l'équipe</h3>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newObjective}
                onChange={(e) => setNewObjective(e.target.value)}
                placeholder="Ajouter un objectif"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
              />
              <button
                type="button"
                onClick={addObjective}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2">
              {objectives.map((objective, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                >
                  <span className="text-gray-900">{objective}</span>
                  <button
                    type="button"
                    onClick={() => removeObjective(objective)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {objectives.length === 0 && (
              <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg">
                Aucun objectif défini pour cette équipe
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : (team ? 'Modifier' : 'Créer')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}