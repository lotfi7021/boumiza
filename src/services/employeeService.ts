import { Employee, EmployeeFormData } from '../types/employee';
import { apiService } from './api';

// Service spécialisé pour la gestion des employés
export class EmployeeService {
  private readonly endpoint = '/employees';

  async getAll(): Promise<Employee[]> {
    return apiService.get<Employee[]>(this.endpoint);
  }

  async getById(id: string): Promise<Employee> {
    return apiService.get<Employee>(`${this.endpoint}/${id}`);
  }

  async getByDepartment(department: string): Promise<Employee[]> {
    return apiService.get<Employee[]>(`${this.endpoint}?department=${department}`);
  }

  async getManagers(): Promise<Employee[]> {
    return apiService.get<Employee[]>(`${this.endpoint}?role=manager`);
  }

  async create(data: EmployeeFormData): Promise<Employee> {
    return apiService.post<Employee>(this.endpoint, data);
  }

  async update(id: string, data: Partial<EmployeeFormData>): Promise<Employee> {
    return apiService.put<Employee>(`${this.endpoint}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  async updateStatus(id: string, status: 'active' | 'inactive' | 'on_leave' | 'terminated'): Promise<Employee> {
    return apiService.put<Employee>(`${this.endpoint}/${id}/status`, { status });
  }

  async updateSalary(id: string, salary: number): Promise<Employee> {
    return apiService.put<Employee>(`${this.endpoint}/${id}/salary`, { salary });
  }

  async assignManager(employeeId: string, managerId: string): Promise<Employee> {
    return apiService.put<Employee>(`${this.endpoint}/${employeeId}/manager`, { managerId });
  }

  async getEmployeesByManager(managerId: string): Promise<Employee[]> {
    return apiService.get<Employee[]>(`${this.endpoint}?manager=${managerId}`);
  }

  async generateEmployeeReport(): Promise<any> {
    return apiService.get<any>(`${this.endpoint}/reports/summary`);
  }
}

export const employeeService = new EmployeeService();