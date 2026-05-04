import { useState } from 'react';
import { X, Users } from 'lucide-react';
import { ClientProject } from '../../types/clientProject';

interface ProjectAssignmentFormProps {
  project: ClientProject;
  onClose: () => void;
  onAssign: (projectId: string, teamId: string, employeeIds: string[]) => Promise<boolean>;
}

// FAKE DATA - Liste des équipes disponibles
const AVAILABLE_TEAMS = [
  { id: 'team-1', name: 'Équipe Développement Web', members: 5 },
  { id: 'team-2', name: 'Équipe Mobile', members: 4 },
  { id: 'team-3', name: 'Équipe Design', members: 3 },
  { id: 'team-4', name: 'Équipe Marketing', members: 6 },
];

export default function ProjectAssignmentForm({ project, onClose, onAssign }: ProjectAssignmentFormProps) {
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedTeam) {
      alert('Veuillez sélectionner une équipe');
      return;
    }

    setLoading(true);
    const success = await onAssign(project.id, selectedTeam, []);
    setLoading(false);

    if (success) {
      onClose();
    }
  };

  const selectedTeamInfo = AVAILABLE_TEAMS.find(team => team.id === selectedTeam);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Affecter une équipe au projet</h2>
            <p className="text-sm text-gray-600 mt-1">{project.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Informations du projet */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Informations du projet</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Client:</span>
                <span className="ml-2 font-medium text-gray-900">{project.clientName}</span>
              </div>
              <div>
                <span className="text-gray-500">Budget:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {project.budget ? `${project.budget.toLocaleString('fr-FR')} €` : '-'}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Échéance:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {project.deadline ? new Date(project.deadline).toLocaleDateString('fr-FR') : '-'}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Statut:</span>
                <span className="ml-2 font-medium text-gray-900">{project.status}</span>
              </div>
            </div>
          </div>

          {/* Sélection de l'équipe */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Sélectionner une équipe *
            </label>
            <div className="grid grid-cols-1 gap-3">
              {AVAILABLE_TEAMS.map(team => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team.id)}
                  className={`flex items-center justify-between p-4 border-2 rounded-lg transition-all ${
                    selectedTeam === team.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      selectedTeam === team.id ? 'bg-indigo-100' : 'bg-gray-100'
                    }`}>
                      <Users className={`h-5 w-5 ${
                        selectedTeam === team.id ? 'text-indigo-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="text-left">
                      <p className={`font-medium ${
                        selectedTeam === team.id ? 'text-indigo-900' : 'text-gray-900'
                      }`}>
                        {team.name}
                      </p>
                      <p className="text-sm text-gray-500">{team.members} membres</p>
                    </div>
                  </div>
                  {selectedTeam === team.id && (
                    <div className="h-5 w-5 bg-indigo-600 rounded-full flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Résumé de la sélection */}
          {selectedTeamInfo && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-900">Équipe sélectionnée</p>
                  <p className="text-sm text-green-700 mt-1">
                    {selectedTeamInfo.name} ({selectedTeamInfo.members} membres)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !selectedTeam}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Affectation...' : 'Confirmer l\'affectation'}
          </button>
        </div>
      </div>
    </div>
  );
}
