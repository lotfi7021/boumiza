import { createContext, useContext, useState, ReactNode } from 'react';
import { AdminRole } from '../types/admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (requiredRole: AdminRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user - à remplacer par une vraie authentification
const mockUser: User = {
  id: '1',
  name: 'Super Admin',
  email: 'superadmin@example.com',
  role: 'super_admin' // Changez ceci pour tester différents rôles
};

const roleHierarchy: Record<AdminRole, number> = {
  employee: 1,
  moderator: 2,
  project_manager: 3,
  admin: 4,
  super_admin: 5
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUser);

  const login = async (email: string, password: string) => {
    // Simulation d'une connexion
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const hasPermission = (requiredRole: AdminRole): boolean => {
    if (!user) return false;
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
