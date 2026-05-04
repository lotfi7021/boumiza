import { useState, useEffect } from 'react';
import { Team, TeamFormData, TeamMember, TeamProject } from '../types/team';
import { teamService } from '../services/teamService';
import { useError } from './useError';

// ============================================
// FAKE DATA - À SUPPRIMER PLUS TARD
// ============================================
const FAKE_TEAMS: Team[] = [
  {
    id: 'team-1',
    name: 'Frontend Development',
    description: 'Équipe responsable du développement des interfaces utilisateur et de l\'expérience client',
    department: 'Développement',
    status: 'active',
    teamLeaderId: 'emp-2',
    teamLeaderName: 'Marie Martin',
    teamLeaderEmail: 'marie.martin@company.com',
    members: [
      {
        id: 'member-1',
        employeeId: 'EMP001',
        employeeName: 'Jean Dupont',
        employeeEmail: 'jean.dupont@company.com',
        role: 'developer',
        department: 'Développement',
        joinedAt: '2022-01-15',
        isActive: true
      },
      {
        id: 'member-2',
        employeeId: 'EMP005',
        employeeName: 'Thomas Petit',
        employeeEmail: 'thomas.petit@company.com',
        role: 'developer',
        department: 'Développement',
        joinedAt: '2023-02-15',
        isActive: true
      },
      {
        id: 'member-3',
        employeeId: 'EMP011',
        employeeName: 'Alexandre Blanc',
        employeeEmail: 'alexandre.blanc@company.com',
        role: 'developer',
        department: 'Développement',
        joinedAt: '2022-04-01',
        isActive: true
      }
    ],
    memberCount: 3,
    createdAt: '2022-01-15',
    updatedAt: '2026-04-20',
    objectives: [
      'Améliorer la performance des interfaces',
      'Implémenter les nouvelles fonctionnalités',
      'Maintenir la qualité du code'
    ],
    currentProjects: [
      {
        id: 'proj-1',
        name: 'Refonte Interface CRM',
        description: 'Modernisation de l\'interface utilisateur du CRM',
        status: 'in_progress',
        startDate: '2026-04-15',
        endDate: '2026-08-01',
        assignedMembers: ['member-1', 'member-2']
      },
      {
        id: 'proj-2',
        name: 'Développement Site E-commerce',
        description: 'Création d\'une plateforme e-commerce complète',
        status: 'in_progress',
        startDate: '2026-04-20',
        endDate: '2026-06-30',
        assignedMembers: ['member-1', 'member-3']
      }
    ],
    performance: {
      completedProjects: 5,
      ongoingProjects: 2,
      averageTaskCompletion: 92,
      teamSatisfaction: 4.5,
      lastUpdated: '2026-04-20'
    }
  },
  {
    id: 'team-2',
    name: 'Backend Development',
    description: 'Équipe responsable du développement des services backend et de l\'architecture système',
    department: 'Développement',
    status: 'active',
    teamLeaderId: 'emp-2',
    teamLeaderName: 'Marie Martin',
    teamLeaderEmail: 'marie.martin@company.com',
    members: [
      {
        id: 'member-4',
        employeeId: 'EMP007',
        employeeName: 'Luc Rousseau',
        employeeEmail: 'luc.rousseau@company.com',
        role: 'developer',
        department: 'Développement',
        joinedAt: '2024-01-10',
        isActive: true
      }
    ],
    memberCount: 1,
    createdAt: '2022-03-10',
    updatedAt: '2026-04-20',
    objectives: [
      'Optimiser les performances des APIs',
      'Améliorer la sécurité des données',
      'Mettre en place une architecture scalable'
    ],
    currentProjects: [
      {
        id: 'proj-3',
        name: 'Système de Gestion Documentaire',
        description: 'Développement d\'un système de gestion électronique de documents',
        status: 'in_progress',
        startDate: '2026-04-15',
        endDate: '2026-09-30',
        assignedMembers: ['member-4']
      }
    ],
    performance: {
      completedProjects: 3,
      ongoingProjects: 1,
      averageTaskCompletion: 88,
      teamSatisfaction: 4.2,
      lastUpdated: '2026-04-20'
    }
  },
  {
    id: 'team-3',
    name: 'Design & UX',
    description: 'Équipe responsable du design, de l\'UX et de la création graphique',
    department: 'Design',
    status: 'active',
    teamLeaderId: 'emp-3',
    teamLeaderName: 'Pierre Bernard',
    teamLeaderEmail: 'pierre.bernard@company.com',
    members: [
      {
        id: 'member-5',
        employeeId: 'EMP003',
        employeeName: 'Pierre Bernard',
        employeeEmail: 'pierre.bernard@company.com',
        role: 'designer',
        department: 'Design',
        joinedAt: '2022-06-01',
        isActive: true
      },
      {
        id: 'member-6',
        employeeId: 'EMP006',
        employeeName: 'Julie Moreau',
        employeeEmail: 'julie.moreau@company.com',
        role: 'designer',
        department: 'Design',
        joinedAt: '2022-09-01',
        isActive: true
      }
    ],
    memberCount: 2,
    createdAt: '2022-06-01',
    updatedAt: '2026-04-20',
    objectives: [
      'Créer des interfaces modernes et intuitives',
      'Maintenir la cohérence du design',
      'Améliorer l\'accessibilité'
    ],
    currentProjects: [
      {
        id: 'proj-4',
        name: 'Refonte Logo et Charte Graphique',
        description: 'Création d\'une nouvelle identité visuelle complète',
        status: 'in_progress',
        startDate: '2026-04-12',
        endDate: '2026-06-15',
        assignedMembers: ['member-5', 'member-6']
      }
    ],
    performance: {
      completedProjects: 4,
      ongoingProjects: 1,
      averageTaskCompletion: 95,
      teamSatisfaction: 4.7,
      lastUpdated: '2026-04-20'
    }
  },
  {
    id: 'team-4',
    name: 'Marketing & Communication',
    description: 'Équipe responsable du marketing, de la communication et de l\'analyse des données',
    department: 'Marketing',
    status: 'active',
    teamLeaderId: 'emp-8',
    teamLeaderName: 'Emma Dubois',
    teamLeaderEmail: 'emma.dubois@company.com',
    members: [
      {
        id: 'member-7',
        employeeId: 'EMP008',
        employeeName: 'Emma Dubois',
        employeeEmail: 'emma.dubois@company.com',
        role: 'analyst',
        department: 'Marketing',
        joinedAt: '2023-05-20',
        isActive: true
      }
    ],
    memberCount: 1,
    createdAt: '2023-05-20',
    updatedAt: '2026-04-20',
    objectives: [
      'Augmenter la visibilité de la marque',
      'Analyser les tendances du marché',
      'Optimiser les campagnes marketing'
    ],
    currentProjects: [],
    performance: {
      completedProjects: 2,
      ongoingProjects: 0,
      averageTaskCompletion: 85,
      teamSatisfaction: 4.0,
      lastUpdated: '2026-04-20'
    }
  },
  {
    id: 'team-5',
    name: 'Support Client',
    description: 'Équipe responsable du support client et de la gestion des réclamations',
    department: 'Support Client',
    status: 'active',
    teamLeaderId: 'emp-9',
    teamLeaderName: 'Lucas Leroy',
    teamLeaderEmail: 'lucas.leroy@company.com',
    members: [
      {
        id: 'member-8',
        employeeId: 'EMP009',
        employeeName: 'Lucas Leroy',
        employeeEmail: 'lucas.leroy@company.com',
        role: 'support',
        department: 'Support Client',
        joinedAt: '2023-08-15',
        isActive: true
      }
    ],
    memberCount: 1,
    createdAt: '2023-08-15',
    updatedAt: '2026-04-20',
    objectives: [
      'Améliorer la satisfaction client',
      'Réduire les temps de réponse',
      'Résoudre les problèmes rapidement'
    ],
    currentProjects: [],
    performance: {
      completedProjects: 1,
      ongoingProjects: 0,
      averageTaskCompletion: 90,
      teamSatisfaction: 4.3,
      lastUpdated: '2026-04-20'
    }
  },
  {
    id: 'team-6',
    name: 'Ressources Humaines',
    description: 'Équipe responsable de la gestion des ressources humaines et du recrutement',
    department: 'Ressources Humaines',
    status: 'active',
    teamLeaderId: 'emp-10',
    teamLeaderName: 'Camille Girard',
    teamLeaderEmail: 'camille.girard@company.com',
    members: [
      {
        id: 'member-9',
        employeeId: 'EMP010',
        employeeName: 'Camille Girard',
        employeeEmail: 'camille.girard@company.com',
        role: 'hr',
        department: 'Ressources Humaines',
        joinedAt: '2021-11-01',
        isActive: true
      }
    ],
    memberCount: 1,
    createdAt: '2021-11-01',
    updatedAt: '2026-04-20',
    objectives: [
      'Recruter les meilleurs talents',
      'Développer les compétences des employés',
      'Améliorer la culture d\'entreprise'
    ],
    currentProjects: [],
    performance: {
      completedProjects: 3,
      ongoingProjects: 0,
      averageTaskCompletion: 93,
      teamSatisfaction: 4.4,
      lastUpdated: '2026-04-20'
    }
  }
];
// ============================================
// FIN FAKE DATA
// ============================================

// Hook personnalisé pour la gestion des équipes
export const useTeams = () => {
  // FAKE DATA: Initialiser avec les données de test
  const [teams, setTeams] = useState<Team[]>(FAKE_TEAMS);
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState<any>(null);
  const [availableEmployees, setAvailableEmployees] = useState<any[]>([]);
  const [teamLeaders, setTeamLeaders] = useState<any[]>([]);
  const { handleError } = useError();

  const fetchTeams = async () => {
    setLoading(true);
    try {
      // FAKE DATA: Commenter l'appel API et utiliser les données de test
      // const data = await teamService.getAll();
      // setTeams(data);
      
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 500));
      setTeams(FAKE_TEAMS);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      // FAKE DATA: Calculer les statistiques à partir des données de test
      // const data = await teamService.getAllStatistics();
      // setStatistics(data);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      const stats = {
        totalTeams: FAKE_TEAMS.length,
        activeTeams: FAKE_TEAMS.filter(t => t.status === 'active').length,
        totalMembers: FAKE_TEAMS.reduce((sum, team) => sum + team.memberCount, 0),
        teamsWithLeaders: FAKE_TEAMS.filter(t => t.teamLeaderId).length,
      };
      setStatistics(stats);
    } catch (error) {
      handleError(error as Error);
    }
  };

  const fetchAvailableEmployees = async () => {
    try {
      // FAKE DATA: Retourner une liste d'employés disponibles
      // const data = await teamService.getAvailableEmployees();
      // setAvailableEmployees(data);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      // Créer une liste d'employés disponibles (tous les employés sauf ceux déjà dans une équipe)
      const FAKE_AVAILABLE_EMPLOYEES = [
        {
          id: 'emp-1',
          employeeId: 'EMP001',
          firstName: 'Jean',
          lastName: 'Dupont',
          email: 'jean.dupont@company.com',
          role: 'developer',
          department: 'Développement'
        },
        {
          id: 'emp-4',
          employeeId: 'EMP004',
          firstName: 'Sophie',
          lastName: 'Laurent',
          email: 'sophie.laurent@company.com',
          role: 'manager',
          department: 'Direction'
        },
        {
          id: 'emp-5',
          employeeId: 'EMP005',
          firstName: 'Thomas',
          lastName: 'Petit',
          email: 'thomas.petit@company.com',
          role: 'developer',
          department: 'Développement'
        },
        {
          id: 'emp-7',
          employeeId: 'EMP007',
          firstName: 'Luc',
          lastName: 'Rousseau',
          email: 'luc.rousseau@company.com',
          role: 'developer',
          department: 'Développement'
        },
        {
          id: 'emp-11',
          employeeId: 'EMP011',
          firstName: 'Alexandre',
          lastName: 'Blanc',
          email: 'alexandre.blanc@company.com',
          role: 'developer',
          department: 'Développement'
        }
      ];
      setAvailableEmployees(FAKE_AVAILABLE_EMPLOYEES);
    } catch (error) {
      handleError(error as Error);
    }
  };

  const fetchTeamLeaders = async () => {
    try {
      // FAKE DATA: Retourner une liste de chefs d'équipe potentiels
      // const data = await teamService.getTeamLeaders();
      // setTeamLeaders(data);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      // Créer une liste de chefs d'équipe potentiels
      const FAKE_TEAM_LEADERS = [
        {
          id: 'emp-2',
          employeeId: 'EMP002',
          firstName: 'Marie',
          lastName: 'Martin',
          email: 'marie.martin@company.com',
          role: 'team_leader',
          department: 'Développement'
        },
        {
          id: 'emp-3',
          employeeId: 'EMP003',
          firstName: 'Pierre',
          lastName: 'Bernard',
          email: 'pierre.bernard@company.com',
          role: 'designer',
          department: 'Design'
        },
        {
          id: 'emp-4',
          employeeId: 'EMP004',
          firstName: 'Sophie',
          lastName: 'Laurent',
          email: 'sophie.laurent@company.com',
          role: 'manager',
          department: 'Direction'
        },
        {
          id: 'emp-8',
          employeeId: 'EMP008',
          firstName: 'Emma',
          lastName: 'Dubois',
          email: 'emma.dubois@company.com',
          role: 'analyst',
          department: 'Marketing'
        },
        {
          id: 'emp-9',
          employeeId: 'EMP009',
          firstName: 'Lucas',
          lastName: 'Leroy',
          email: 'lucas.leroy@company.com',
          role: 'support',
          department: 'Support Client'
        },
        {
          id: 'emp-10',
          employeeId: 'EMP010',
          firstName: 'Camille',
          lastName: 'Girard',
          email: 'camille.girard@company.com',
          role: 'hr',
          department: 'Ressources Humaines'
        }
      ];
      setTeamLeaders(FAKE_TEAM_LEADERS);
    } catch (error) {
      handleError(error as Error);
    }
  };

  const createTeam = async (data: TeamFormData): Promise<boolean> => {
    try {
      // FAKE DATA: Créer directement dans l'état local sans appel API
      // const newTeam = await teamService.create(data);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      const newTeam: Team = {
        id: `team-${Date.now()}`,
        name: data.name,
        description: data.description,
        department: data.department,
        status: data.status,
        teamLeaderId: data.teamLeaderId,
        members: [],
        memberCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        objectives: data.objectives,
        currentProjects: [],
        performance: {
          completedProjects: 0,
          ongoingProjects: 0,
          averageTaskCompletion: 0,
          teamSatisfaction: 0,
          lastUpdated: new Date().toISOString()
        }
      };
      setTeams(prev => [...prev, newTeam]);
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const updateTeam = async (id: string, data: Partial<TeamFormData>): Promise<boolean> => {
    try {
      // FAKE DATA: Mettre à jour directement l'état local sans appel API
      // const updatedTeam = await teamService.update(id, data);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setTeams(prev => prev.map(team => 
        team.id === id ? { ...team, ...data, updatedAt: new Date().toISOString() } : team
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const deleteTeam = async (id: string): Promise<boolean> => {
    try {
      // FAKE DATA: Supprimer directement de l'état local sans appel API
      // await teamService.delete(id);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setTeams(prev => prev.filter(team => team.id !== id));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const updateTeamStatus = async (id: string, status: 'active' | 'inactive' | 'on_hold'): Promise<boolean> => {
    try {
      // FAKE DATA: Mettre à jour directement l'état local sans appel API
      // const updatedTeam = await teamService.updateStatus(id, status);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setTeams(prev => prev.map(team => 
        team.id === id ? { ...team, status, updatedAt: new Date().toISOString() } : team
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const assignTeamLeader = async (teamId: string, employeeId: string): Promise<boolean> => {
    try {
      // FAKE DATA: Mettre à jour directement l'état local sans appel API
      // const updatedTeam = await teamService.assignTeamLeader(teamId, employeeId);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setTeams(prev => prev.map(team => 
        team.id === teamId ? { ...team, teamLeaderId: employeeId, updatedAt: new Date().toISOString() } : team
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const removeTeamLeader = async (teamId: string): Promise<boolean> => {
    try {
      // FAKE DATA: Mettre à jour directement l'état local sans appel API
      // const updatedTeam = await teamService.removeTeamLeader(teamId);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setTeams(prev => prev.map(team => 
        team.id === teamId ? { ...team, teamLeaderId: undefined, updatedAt: new Date().toISOString() } : team
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const addTeamMember = async (teamId: string, employeeId: string): Promise<boolean> => {
    try {
      // FAKE DATA: Ajouter directement le membre dans l'état local sans appel API
      // const updatedTeam = await teamService.addMember(teamId, employeeId);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setTeams(prev => prev.map(team => 
        team.id === teamId ? { 
          ...team, 
          memberCount: team.memberCount + 1,
          updatedAt: new Date().toISOString()
        } : team
      ));
      await fetchAvailableEmployees();
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const removeTeamMember = async (teamId: string, employeeId: string): Promise<boolean> => {
    try {
      // FAKE DATA: Supprimer directement le membre de l'état local sans appel API
      // const updatedTeam = await teamService.removeMember(teamId, employeeId);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setTeams(prev => prev.map(team => 
        team.id === teamId ? { 
          ...team, 
          memberCount: Math.max(0, team.memberCount - 1),
          updatedAt: new Date().toISOString()
        } : team
      ));
      await fetchAvailableEmployees();
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const addTeamProject = async (teamId: string, project: Omit<TeamProject, 'id'>): Promise<boolean> => {
    try {
      // FAKE DATA: Ajouter directement le projet dans l'état local sans appel API
      // const updatedTeam = await teamService.addProject(teamId, project);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      const newProject: TeamProject = {
        id: `proj-${Date.now()}`,
        ...project
      };
      setTeams(prev => prev.map(team => 
        team.id === teamId ? { 
          ...team, 
          currentProjects: [...(team.currentProjects || []), newProject],
          updatedAt: new Date().toISOString()
        } : team
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const updateTeamProject = async (teamId: string, projectId: string, project: Partial<TeamProject>): Promise<boolean> => {
    try {
      // FAKE DATA: Mettre à jour directement le projet dans l'état local sans appel API
      // const updatedTeam = await teamService.updateProject(teamId, projectId, project);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setTeams(prev => prev.map(team => 
        team.id === teamId ? { 
          ...team, 
          currentProjects: (team.currentProjects || []).map(p => 
            p.id === projectId ? { ...p, ...project } : p
          ),
          updatedAt: new Date().toISOString()
        } : team
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  useEffect(() => {
    fetchTeams();
    fetchStatistics();
    fetchAvailableEmployees();
    fetchTeamLeaders();
  }, []);

  return {
    teams,
    loading,
    statistics,
    availableEmployees,
    teamLeaders,
    fetchTeams,
    createTeam,
    updateTeam,
    deleteTeam,
    updateTeamStatus,
    assignTeamLeader,
    removeTeamLeader,
    addTeamMember,
    removeTeamMember,
    addTeamProject,
    updateTeamProject,
    refreshAvailableEmployees: fetchAvailableEmployees,
    refreshTeamLeaders: fetchTeamLeaders,
  };
};