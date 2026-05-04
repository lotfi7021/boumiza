import { ClientProject, ClientProjectFormData, ProjectAssignmentData, ClientProjectStatus } from '../types/clientProject';
import { apiService } from './api';

export class ClientProjectService {
  private readonly endpoint = '/client-projects';

  async getAll(): Promise<ClientProject[]> {
    return apiService.get<ClientProject[]>(this.endpoint);
  }

  async getByStatus(status: ClientProjectStatus): Promise<ClientProject[]> {
    return apiService.get<ClientProject[]>(`${this.endpoint}?status=${status}`);
  }

  async getById(id: string): Promise<ClientProject> {
    return apiService.get<ClientProject>(`${this.endpoint}/${id}`);
  }

  async getByClient(clientId: string): Promise<ClientProject[]> {
    return apiService.get<ClientProject[]>(`${this.endpoint}?clientId=${clientId}`);
  }

  async create(data: ClientProjectFormData): Promise<ClientProject> {
    return apiService.post<ClientProject>(this.endpoint, data);
  }

  async update(id: string, data: Partial<ClientProjectFormData>): Promise<ClientProject> {
    return apiService.put<ClientProject>(`${this.endpoint}/${id}`, data);
  }

  async updateStatus(id: string, status: ClientProjectStatus, notes?: string): Promise<ClientProject> {
    return apiService.put<ClientProject>(`${this.endpoint}/${id}/status`, { 
      status, 
      adminNotes: notes 
    });
  }

  async assignProject(id: string, assignmentData: ProjectAssignmentData): Promise<ClientProject> {
    return apiService.put<ClientProject>(`${this.endpoint}/${id}/assign`, assignmentData);
  }

  async delete(id: string): Promise<void> {
    return apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}

export const clientProjectService = new ClientProjectService();
