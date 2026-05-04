import React, { createContext, useContext, ReactNode } from 'react';
import { useTeams } from '../hooks/useTeams';
import { Team, TeamFormData, TeamProject } from '../types/team';

interface TeamContextType {
  teams: Team[];
  loading: boolean;
  statistics: any;
  availableEmployees: any[];
  teamLeaders: any[];
  createTeam: (data: TeamFormData) => Promise<boolean>;
  updateTeam: (id: string, data: Partial<TeamFormData>) => Promise<boolean>;
  deleteTeam: (id: string) => Promise<boolean>;
  updateTeamStatus: (id: string, status: 'active' | 'inactive' | 'on_hold') => Promise<boolean>;
  assignTeamLeader: (teamId: string, employeeId: string) => Promise<boolean>;
  removeTeamLeader: (teamId: string) => Promise<boolean>;
  addTeamMember: (teamId: string, employeeId: string) => Promise<boolean>;
  removeTeamMember: (teamId: string, employeeId: string) => Promise<boolean>;
  addTeamProject: (teamId: string, project: Omit<TeamProject, 'id'>) => Promise<boolean>;
  updateTeamProject: (teamId: string, projectId: string, project: Partial<TeamProject>) => Promise<boolean>;
  refreshTeams: () => Promise<void>;
  refreshAvailableEmployees: () => Promise<void>;
  refreshTeamLeaders: () => Promise<void>;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

interface TeamProviderProps {
  children: ReactNode;
}

// Provider pour la gestion globale des équipes
export const TeamProvider: React.FC<TeamProviderProps> = ({ children }) => {
  const teamHook = useTeams();

  const value: TeamContextType = {
    ...teamHook,
    refreshTeams: teamHook.fetchTeams,
  };

  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeamContext = (): TeamContextType => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeamContext must be used within a TeamProvider');
  }
  return context;
};