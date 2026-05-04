import React, { createContext, useContext, ReactNode } from 'react';
import { useUsers } from '../hooks/useUsers';
import { User, UserFormData } from '../types/user';

interface UserContextType {
  users: User[];
  loading: boolean;
  createUser: (data: UserFormData) => Promise<boolean>;
  updateUser: (id: string, data: Partial<UserFormData>) => Promise<boolean>;
  deleteUser: (id: string) => Promise<boolean>;
  updateUserStatus: (id: string, status: 'active' | 'inactive' | 'suspended') => Promise<boolean>;
  refreshUsers: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

// Provider pour la gestion globale des utilisateurs
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const userHook = useUsers();

  const value: UserContextType = {
    ...userHook,
    refreshUsers: userHook.fetchUsers,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};