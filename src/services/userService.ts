import { User, UserFormData } from '../types/user';
import { apiService } from './api';

// Service spécialisé pour la gestion des utilisateurs
export class UserService {
  private readonly endpoint = '/users';

  async getAll(): Promise<User[]> {
    return apiService.get<User[]>(this.endpoint);
  }

  async getById(id: string): Promise<User> {
    return apiService.get<User>(`${this.endpoint}/${id}`);
  }

  async create(data: UserFormData): Promise<User> {
    return apiService.post<User>(this.endpoint, data);
  }

  async update(id: string, data: Partial<UserFormData>): Promise<User> {
    return apiService.put<User>(`${this.endpoint}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  async updateStatus(id: string, status: 'active' | 'inactive' | 'suspended'): Promise<User> {
    return apiService.put<User>(`${this.endpoint}/${id}/status`, { status });
  }

  async resetPassword(id: string): Promise<void> {
    return apiService.post<void>(`${this.endpoint}/${id}/reset-password`, {});
  }
}

export const userService = new UserService();