import React, { createContext, useContext, ReactNode } from 'react';
import { useEmployees } from '../hooks/useEmployees';
import { Employee, EmployeeFormData } from '../types/employee';

interface EmployeeContextType {
  employees: Employee[];
  loading: boolean;
  createEmployee: (data: EmployeeFormData) => Promise<boolean>;
  updateEmployee: (id: string, data: Partial<EmployeeFormData>) => Promise<boolean>;
  deleteEmployee: (id: string) => Promise<boolean>;
  updateEmployeeStatus: (id: string, status: 'active' | 'inactive' | 'on_leave' | 'terminated') => Promise<boolean>;
  assignManager: (employeeId: string, managerId: string) => Promise<boolean>;
  updateSalary: (id: string, salary: number) => Promise<boolean>;
  refreshEmployees: () => Promise<void>;
  filterByDepartment: (department: string) => Promise<void>;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

interface EmployeeProviderProps {
  children: ReactNode;
}

// Provider pour la gestion globale des employés
export const EmployeeProvider: React.FC<EmployeeProviderProps> = ({ children }) => {
  const employeeHook = useEmployees();

  const value: EmployeeContextType = {
    ...employeeHook,
    refreshEmployees: employeeHook.fetchEmployees,
    filterByDepartment: employeeHook.fetchEmployeesByDepartment,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = (): EmployeeContextType => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
};