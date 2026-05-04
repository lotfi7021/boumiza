import React, { createContext, useContext, ReactNode } from 'react';
import { useAdmins } from '../hooks/useAdmins';
import { Admin, AdminFormData } from '../types/admin';

interface AdminContextType {
  admins: Admin[];
  loading: boolean;
  createAdmin: (data: AdminFormData) => Promise<boolean>;
  updateAdmin: (id: string, data: Partial<AdminFormData>) => Promise<boolean>;
  deleteAdmin: (id: string) => Promise<boolean>;
  toggleAdminStatus: (id: string) => Promise<boolean>;
  refreshAdmins: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminProviderProps {
  children: ReactNode;
}

// Provider pour la gestion globale des administrateurs
export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const adminHook = useAdmins();

  const value: AdminContextType = {
    ...adminHook,
    refreshAdmins: adminHook.fetchAdmins,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};