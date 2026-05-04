import { useState } from 'react';
import { X, Crown, Users, Plus, Minus, Calendar, Briefcase, Target, UserPlus, UserMinus } from 'lucide-react';
import { Team, TEAM_STATUS_LABELS, TEAM_STATUS_COLORS, PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from '../../types/team';
import { useTeamContext } from '../../contexts/TeamContext';
import { useError } from '../../hooks/useError';

interface TeamDetailsProps {
  team: Team;
  onClose: () => void;
  onEdit: () => void;
}

export default function TeamDetails({ team, onClose, onEdit }: TeamDetailsProps) {
  const { 
    deleteTeam, 
    updateTeamStatus, 
    assignTeamLeader, 
    removeTeamLeader, 
    addTeamMember, 
    removeTeamMember,
    availableEmployees,
    teamLeaders
  } = useTeamContext();
  const { error, handleError } = useError();
  
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAssignLeader, setShowAssignLeader] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [selectedLeaderId, setSelectedLeaderId] = useState('');

  // FAKE DATA: Liste de tous les employés disponibles pour l'affectation
  const FAKE_ALL_EMPLOYEES = [
    { id: 'emp-1', firstName: 'Jean', lastName: 'Dupont', role: 'developer', department: 'Développement' },
    { id: 'emp-2', firstName: 'Marie', lastName: 'Martin', role: 'team_leader', department: 'Développement' },
    { id: 'emp-3', firstName: 'Pierre', lastName: 'Bernard', role: 'designer', department: 'Design' },
    { id: 'emp-4', firstName: 'Sophie', lastName: 'Laurent', role: 'manager', department: 'Direction' },
    { id: 'emp-5', firstName: 'Thomas', lastName: 'Petit', role: 'developer', department: 'Développement' },
    { id: 'emp-6', firstName: 'Julie', lastName: 'Moreau', role: 'designer', department: 'Design' },
    { id: 'emp-7', firstName: 'Luc', lastName: 'Rousseau', role: 'developer', department: 'Développement' },
    { id: 'emp-8', firstName: 'Emma', lastName: 'Dubois', role: 'analyst', department: 'Marketing' },
    { id: 'emp-9', firstName: 'Lucas', lastName: 'Leroy', role: 'support', department: 'Support Client' },
    { id: 'emp-10', firstName: 'Camille', lastName: 'Girard', role: 'hr', department: 'Ressources Humaines' },
    { id: 'emp-11', firstName: 'Alexandre', lastName: 'Blanc', role: 'developer', department: 'Développement' },
  ];

  // FAKE DATA: Liste des chefs d'équipe potentiels
  const FAKE_TEAM_LEADERS = [
    { id: 'emp-2', firstName: 'Marie', lastName: 'Martin', role: 'team_leader', department: 'Développement' },
    { id: 'emp-3', firstName: 'Pierre', lastName: 'Bernard', role: 'designer', department: 'Design' },
    { id: 'emp-4', firstName: 'Sophie', lastName: 'Laurent', role: 'manager', department: 'Direction' },
    { id: 'emp-8', firstName: 'Emma', lastName: 'Dubois', role: 'analyst', department: 'Marketing' },
    { id: 'emp-9', firstName: 'Lucas', lastName: 'Leroy', role: 'support', department: 'Support Client' },
    { id: 'emp-10', firstName: 'Camille', lastName: 'Girard', role: 'hr', department: 'Ressources Humaines' },
  ];

  // Filtrer les employés déjà dans l'équipe
  const employeesToAdd = FAKE_ALL_EMPLOYEES.filter(
    emp => !team.members.some(member => member.employeeId === emp.id)
  );

  // Utiliser les chefs d'équipe disponibles
  const leadersToAssign = FAKE_TEAM_LEADERS;

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette équipe ?')) {
      const success = await deleteTeam(team.id);
      if (success) {
        onClose();
      }
    }
  };

  const handleStatusChange = async (newStatus: 'active' | 'inactive' | 'on_hold') => {
    await updateTeamStatus(team.id, newStatus);
  };

  const handleAssignLeader = async () => {
    if (selectedLeaderId) {
      const success = await assignTeamLeader(team.id, selectedLeaderId);
      if (success) {
        setShowAssignLeader(false);
        setSelectedLeaderId('');
      }
    }
  };

  const handleRemoveLeader = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir retirer le chef d\'équipe ?')) {
      await removeTeamLeader(team.id);
    }
  };

  const handleAddMember = async () => {
    if (selectedEmployeeId) {
      const success = await addTeamMember(team.id, selectedEmployeeId);
      if (success) {
        setShowAddMember(false);
        setSelectedEmployeeId('');
      }
    }
  };

  const handleRemoveMember = async (employeeId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir retirer ce membre de l\'équipe ?')) {
      await removeTeamMember(team.id, employeeId);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{team.name}</h2>
            <p className="text-sm text-gray-500">{team.department}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Informations générales</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="text-gray-900">{team.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Statut</p>
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                      TEAM_STATUS_COLORS[team.status]
                    }`}>
                      {TEAM_STATUS_LABELS[team.status]}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Créée le</p>
                    <p className="text-gray-900">{new Date(team.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Chef d'équipe</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {team.teamLeaderName ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Crown className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="font-medium text-gray-900">{team.teamLeaderName}</p>
                          <p className="text-sm text-gray-500">{team.teamLeaderEmail}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleRemoveLeader}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <UserMinus className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <Crown className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 mb-3">Aucun chef d'équipe assigné</p>
                      <button
                        onClick={() => setShowAssignLeader(true)}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <UserPlus className="h-4 w-4" />
                        Assigner un chef
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Membres de l'équipe ({team.memberCount})
              </h3>
              <button
                onClick={() => setShowAddMember(true)}
                className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Ajouter un membre
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {team.members.map((member) => (
                <div key={member.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 font-semibold text-sm">
                          {member.employeeName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{member.employeeName}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveMember(member.employeeId)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {team.members.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Aucun membre dans cette équipe</p>
              </div>
            )}
          </div>

          {/* Projects */}
          {team.currentProjects && team.currentProjects.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Projets en cours ({team.currentProjects.length})
              </h3>
              <div className="space-y-3">
                {team.currentProjects.map((project) => (
                  <div key={project.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="h-4 w-4 text-gray-400" />
                          <h4 className="font-medium text-gray-900">{project.name}</h4>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            PROJECT_STATUS_COLORS[project.status]
                          }`}>
                            {PROJECT_STATUS_LABELS[project.status]}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Début: {project.startDate}</span>
                          {project.endDate && <span>Fin: {project.endDate}</span>}
                          <span>{project.assignedMembers.length} membre(s) assigné(s)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Objectives */}
          {team.objectives && team.objectives.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Objectifs</h3>
              <div className="space-y-2">
                {team.objectives.map((objective, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-indigo-600" />
                    <span className="text-gray-900">{objective}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
          {error && (
            <div className="flex-1 text-sm text-red-600 bg-red-50 p-2 rounded">
              {error.message}
            </div>
          )}
          
          {/* Status Actions */}
          {team.status === 'active' && (
            <>
              <button
                onClick={() => handleStatusChange('on_hold')}
                className="px-4 py-2 border border-yellow-300 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors"
              >
                Mettre en pause
              </button>
              <button
                onClick={() => handleStatusChange('inactive')}
                className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Désactiver
              </button>
            </>
          )}
          
          {team.status === 'inactive' && (
            <button
              onClick={() => handleStatusChange('active')}
              className="px-4 py-2 border border-green-300 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              Activer
            </button>
          )}
          
          {team.status === 'on_hold' && (
            <button
              onClick={() => handleStatusChange('active')}
              className="px-4 py-2 border border-green-300 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              Reprendre
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
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Modifier
          </button>
        </div>

        {/* Add Member Modal */}
        {showAddMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="p-4 border-b border-gray-200 sticky top-0 bg-white">
                <h3 className="text-lg font-semibold text-gray-900">Ajouter un membre</h3>
              </div>
              <div className="p-4">
                {employeesToAdd && employeesToAdd.length > 0 ? (
                  <div className="space-y-2">
                    {employeesToAdd.map((employee) => (
                      <button
                        key={employee.id}
                        onClick={() => setSelectedEmployeeId(employee.id)}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                          selectedEmployeeId === employee.id
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <p className="font-medium text-gray-900">
                          {employee.firstName} {employee.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{employee.role}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 mb-1">Aucun employé disponible</p>
                    <p className="text-sm text-gray-400">Tous les employés sont déjà assignés à cette équipe</p>
                  </div>
                )}
              </div>
              <div className="flex gap-3 p-4 border-t border-gray-200 sticky bottom-0 bg-white">
                <button
                  onClick={() => {
                    setShowAddMember(false);
                    setSelectedEmployeeId('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddMember}
                  disabled={!selectedEmployeeId || !employeesToAdd || employeesToAdd.length === 0}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Assign Leader Modal */}
        {showAssignLeader && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="p-4 border-b border-gray-200 sticky top-0 bg-white">
                <h3 className="text-lg font-semibold text-gray-900">Assigner un chef d'équipe</h3>
              </div>
              <div className="p-4">
                {leadersToAssign && leadersToAssign.length > 0 ? (
                  <div className="space-y-2">
                    {leadersToAssign.map((leader) => (
                      <button
                        key={leader.id}
                        onClick={() => setSelectedLeaderId(leader.id)}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                          selectedLeaderId === leader.id
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <p className="font-medium text-gray-900">
                          {leader.firstName} {leader.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{leader.department}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Crown className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 mb-1">Aucun chef d'équipe disponible</p>
                    <p className="text-sm text-gray-400">Aucun employé avec le rôle de chef d'équipe</p>
                  </div>
                )}
              </div>
              <div className="flex gap-3 p-4 border-t border-gray-200 sticky bottom-0 bg-white">
                <button
                  onClick={() => {
                    setShowAssignLeader(false);
                    setSelectedLeaderId('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAssignLeader}
                  disabled={!selectedLeaderId || !leadersToAssign || leadersToAssign.length === 0}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  Assigner
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}