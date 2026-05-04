import { useState, useEffect } from 'react';
import { Employee, EmployeeFormData } from '../types/employee';
import { employeeService } from '../services/employeeService';
import { useError } from './useError';

// ============================================
// FAKE DATA - À SUPPRIMER PLUS TARD
// ============================================
const FAKE_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    employeeId: 'EMP001',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@company.com',
    phone: '+33 6 12 34 56 78',
    role: 'developer',
    status: 'active',
    contractType: 'full_time',
    department: 'Développement',
    hireDate: '2022-01-15',
    salary: 45000,
    address: '12 Rue de la Paix, 75001 Paris',
    emergencyContact: {
      name: 'Marie Dupont',
      phone: '+33 6 98 76 54 32',
      relationship: 'Épouse'
    },
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    createdAt: '2022-01-15',
    updatedAt: '2026-04-20'
  },
  {
    id: 'emp-2',
    employeeId: 'EMP002',
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@company.com',
    phone: '+33 6 23 45 67 89',
    role: 'team_leader',
    status: 'active',
    contractType: 'full_time',
    department: 'Développement',
    hireDate: '2021-03-10',
    salary: 55000,
    address: '45 Avenue des Champs, 75008 Paris',
    emergencyContact: {
      name: 'Pierre Martin',
      phone: '+33 6 87 65 43 21',
      relationship: 'Époux'
    },
    skills: ['Leadership', 'Scrum', 'Java', 'Spring Boot', 'Docker'],
    createdAt: '2021-03-10',
    updatedAt: '2026-04-20'
  },
  {
    id: 'emp-3',
    employeeId: 'EMP003',
    firstName: 'Pierre',
    lastName: 'Bernard',
    email: 'pierre.bernard@company.com',
    phone: '+33 6 34 56 78 90',
    role: 'designer',
    status: 'active',
    contractType: 'full_time',
    department: 'Design',
    hireDate: '2022-06-01',
    salary: 42000,
    address: '78 Boulevard Saint-Germain, 75005 Paris',
    emergencyContact: {
      name: 'Sophie Bernard',
      phone: '+33 6 76 54 32 10',
      relationship: 'Sœur'
    },
    skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UI/UX'],
    createdAt: '2022-06-01',
    updatedAt: '2026-04-20'
  },
  {
    id: 'emp-4',
    employeeId: 'EMP004',
    firstName: 'Sophie',
    lastName: 'Laurent',
    email: 'sophie.laurent@company.com',
    phone: '+33 6 45 67 89 01',
    role: 'manager',
    status: 'active',
    contractType: 'full_time',
    department: 'Direction',
    hireDate: '2020-01-05',
    salary: 65000,
    address: '23 Rue du Faubourg, 75010 Paris',
    emergencyContact: {
      name: 'Thomas Laurent',
      phone: '+33 6 65 43 21 09',
      relationship: 'Époux'
    },
    skills: ['Management', 'Stratégie', 'Budget', 'Leadership'],
    createdAt: '2020-01-05',
    updatedAt: '2026-04-20'
  },
 
 
  
  
  
];
// ============================================
// FIN FAKE DATA
// ============================================

// Hook personnalisé pour la gestion des employés
export const useEmployees = () => {
  // FAKE DATA: Initialiser avec les données de test
  const [employees, setEmployees] = useState<Employee[]>(FAKE_EMPLOYEES);
  const [loading, setLoading] = useState(false);
  const { handleError } = useError();

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      // FAKE DATA: Commenter l'appel API et utiliser les données de test
      // const data = await employeeService.getAll();
      // setEmployees(data);
      
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 500));
      setEmployees(FAKE_EMPLOYEES);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeesByDepartment = async (department: string) => {
    setLoading(true);
    try {
      // FAKE DATA: Commenter l'appel API et filtrer les données de test
      // const data = await employeeService.getByDepartment(department);
      // setEmployees(data);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      const filtered = FAKE_EMPLOYEES.filter(emp => emp.department === department);
      setEmployees(filtered);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (data: EmployeeFormData): Promise<boolean> => {
    try {
      const newEmployee = await employeeService.create(data);
      setEmployees(prev => [...prev, newEmployee]);
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const updateEmployee = async (id: string, data: Partial<EmployeeFormData>): Promise<boolean> => {
    try {
      const updatedEmployee = await employeeService.update(id, data);
      setEmployees(prev => prev.map(emp => 
        emp.id === id ? updatedEmployee : emp
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const deleteEmployee = async (id: string): Promise<boolean> => {
    try {
      // FAKE DATA: Supprimer directement de l'état local sans appel API
      // await employeeService.delete(id);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const updateEmployeeStatus = async (id: string, status: 'active' | 'inactive' | 'on_leave' | 'terminated'): Promise<boolean> => {
    try {
      // FAKE DATA: Mettre à jour directement l'état local sans appel API
      // const updatedEmployee = await employeeService.updateStatus(id, status);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setEmployees(prev => prev.map(emp => 
        emp.id === id ? { ...emp, status, updatedAt: new Date().toISOString() } : emp
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const assignManager = async (employeeId: string, managerId: string): Promise<boolean> => {
    try {
      const updatedEmployee = await employeeService.assignManager(employeeId, managerId);
      setEmployees(prev => prev.map(emp => 
        emp.id === employeeId ? updatedEmployee : emp
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  const updateSalary = async (id: string, salary: number): Promise<boolean> => {
    try {
      const updatedEmployee = await employeeService.updateSalary(id, salary);
      setEmployees(prev => prev.map(emp => 
        emp.id === id ? updatedEmployee : emp
      ));
      return true;
    } catch (error) {
      handleError(error as Error);
      return false;
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    fetchEmployees,
    fetchEmployeesByDepartment,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    updateEmployeeStatus,
    assignManager,
    updateSalary,
  };
};