import { useState } from 'react';
import { Plus, Search, Users, UserCheck, Crown, Briefcase } from 'lucide-react';
import { useTeamContext } from '../../contexts/TeamContext';
import { Team, TEAM_STATUS_LABELS, TEAM_STATUS_COLORS } from '../../types/team';
import { TeamDetails, TeamForm } from '../../components/admin';

export default function Teams() {
  const { teams, loading, statistics } = useTeamContext();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  // Filtrage des équipes
  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (team.teamLeaderName && team.teamLeaderName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || team.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || team.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Statistiques calculées
  const stats = statistics || {
    totalTeams: teams.length,
    activeTeams: teams.filter(t => t.status === 'active').length,
    totalMembers: teams.reduce((sum, team) => sum + team.memberCount, 0),
    teamsWithLeaders: teams.filter(t => t.teamLeaderId).length,
  };

  // Départements uniques
  const departments = [...new Set(teams.map(team => team.department))];

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTeam(null);
  };

  const handleCloseDetails = () => {
    setSelectedTeam(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Équipes</h1>
          <p className="text-gray-600">Organisez vos employés en équipes avec des chefs d'équipe</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Nouvelle Équipe
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Équipes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTeams}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Équipes Actives</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeTeams}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Crown className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avec Chef</p>
              <p className="text-2xl font-bold text-gray-900">{stats.teamsWithLeaders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Briefcase className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Membres</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMembers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom d'équipe, description ou chef..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on_hold">En pause</option>
            </select>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Tous les départements</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <div key={team.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{team.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{team.department}</p>
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                  TEAM_STATUS_COLORS[team.status]
                }`}>
                  {TEAM_STATUS_LABELS[team.status]}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{team.description}</p>

            {/* Team Leader */}
            <div className="mb-4">
              {team.teamLeaderName ? (
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-900">{team.teamLeaderName}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-400">
                  <Crown className="h-4 w-4" />
                  <span className="text-sm">Aucun chef d'équipe</span>
                </div>
              )}
            </div>

            {/* Members Count */}
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {team.memberCount} membre{team.memberCount > 1 ? 's' : ''}
              </span>
            </div>

            {/* Projects */}
            {team.currentProjects && team.currentProjects.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {team.currentProjects.length} projet{team.currentProjects.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <button
                onClick={() => setSelectedTeam(team)}
                className="flex-1 px-3 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                Voir détails
              </button>
              <button
                onClick={() => handleEdit(team)}
                className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Modifier
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Aucune équipe trouvée</p>
        </div>
      )}

      {/* Modals */}
      {selectedTeam && (
        <TeamDetails
          team={selectedTeam}
          onClose={handleCloseDetails}
          onEdit={() => handleEdit(selectedTeam)}
        />
      )}

      {showForm && (
        <TeamForm
          team={editingTeam}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}