import React, { createContext, useContext, ReactNode } from 'react';
import { useClientProjects } from '../hooks/useClientProjects';
import { ClientProject, ClientProjectFormData, ProjectAssignmentData, ClientProjectStatus } from '../types/clientProject';

// Context pour la gestion des projets clients
interface ClientProjectContextType {
  projects: ClientProject[];
  loading: boolean;
  statistics: any;
  createProject: (data: ClientProjectFormData) => Promise<boolean>;
  updateProject: (id: string, data: Partial<ClientProjectFormData>) => Promise<boolean>;
  updateProjectStatus: (id: string, status: ClientProjectStatus, notes?: string) => Promise<boolean>;
  assignProject: (id: string, assignmentData: ProjectAssignmentData) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  refreshProjects: () => Promise<void>;
  filterByStatus: (status: ClientProjectStatus) => Promise<void>;
}

const ClientProjectContext = createContext<ClientProjectContextType | undefined>(undefined);

interface ClientProjectProviderProps {
  children: ReactNode;
}

export const ClientProjectProvider: React.FC<ClientProjectProviderProps> = ({ children }) => {
  const projectHook = useClientProjects();

  const value: ClientProjectContextType = {
    ...projectHook,
    refreshProjects: projectHook.fetchProjects,
    filterByStatus: projectHook.fetchProjectsByStatus,
  };

  return (
    <ClientProjectContext.Provider value={value}>
      {children}
    </ClientProjectContext.Provider>
  );
};

export const useClientProjectContext = (): ClientProjectContextType => {
  const context = useContext(ClientProjectContext);
  if (!context) {
    throw new Error('useClientProjectContext must be used within a ClientProjectProvider');
  }
  return context;
};
