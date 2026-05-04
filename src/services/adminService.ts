import { Admin, AdminFormData } from '../types/admin';
import { apiService } from './api';

// Service spécialisé pour la gestion des administrateurs
export class AdminService {
  private readonly endpoint = '/admins';

  async getAll(): Promise<Admin[]> {
    return apiService.get<Admin[]>(this.endpoint);
  }

  async getById(id: string): Promise<Admin> {
    return apiService.get<Admin>(`${this.endpoint}/${id}`);
  }

  async create(data: AdminFormData): Promise<Admin> {
    return apiService.post<Admin>(this.endpoint, data);
  }

  async update(id: string, data: Partial<AdminFormData>): Promise<Admin> {
    return apiService.put<Admin>(`${this.endpoint}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  async updateStatus(id: string, status: 'active' | 'inactive'): Promise<Admin> {
    return apiService.put<Admin>(`${this.endpoint}/${id}/status`, { status });
  }

  async resetPassword(id: string): Promise<void> {
    return apiService.post<void>(`${this.endpoint}/${id}/reset-password`, {});
  }
}

export const adminService = new AdminService();