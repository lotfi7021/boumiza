import { Complaint, ComplaintFormData, ComplaintComment, ComplaintType, ComplaintStatus } from '../types/complaint';
import { apiService } from './api';

// Service spécialisé pour la gestion des réclamations
export class ComplaintService {
  private readonly endpoint = '/complaints';

  async getAll(): Promise<Complaint[]> {
    return apiService.get<Complaint[]>(this.endpoint);
  }

  async getByType(type: ComplaintType): Promise<Complaint[]> {
    return apiService.get<Complaint[]>(`${this.endpoint}?type=${type}`);
  }

  async getByStatus(status: ComplaintStatus): Promise<Complaint[]> {
    return apiService.get<Complaint[]>(`${this.endpoint}?status=${status}`);
  }

  async getById(id: string): Promise<Complaint> {
    return apiService.get<Complaint>(`${this.endpoint}/${id}`);
  }

  async getAssignedToMe(adminId: string): Promise<Complaint[]> {
    return apiService.get<Complaint[]>(`${this.endpoint}?assignedTo=${adminId}`);
  }

  async create(data: ComplaintFormData): Promise<Complaint> {
    return apiService.post<Complaint>(this.endpoint, data);
  }

  async update(id: string, data: Partial<ComplaintFormData>): Promise<Complaint> {
    return apiService.put<Complaint>(`${this.endpoint}/${id}`, data);
  }

  async updateStatus(id: string, status: ComplaintStatus): Promise<Complaint> {
    return apiService.put<Complaint>(`${this.endpoint}/${id}/status`, { status });
  }

  async assignTo(id: string, adminId: string): Promise<Complaint> {
    return apiService.put<Complaint>(`${this.endpoint}/${id}/assign`, { adminId });
  }

  async resolve(id: string, resolution: string, resolutionNotes?: string): Promise<Complaint> {
    return apiService.put<Complaint>(`${this.endpoint}/${id}/resolve`, { 
      resolution, 
      resolutionNotes 
    });
  }

  async reject(id: string, reason: string): Promise<Complaint> {
    return apiService.put<Complaint>(`${this.endpoint}/${id}/reject`, { reason });
  }

  async addComment(complaintId: string, content: string, isInternal: boolean = false): Promise<ComplaintComment> {
    return apiService.post<ComplaintComment>(`${this.endpoint}/${complaintId}/comments`, {
      content,
      isInternal
    });
  }

  async getComments(complaintId: string): Promise<ComplaintComment[]> {
    return apiService.get<ComplaintComment[]>(`${this.endpoint}/${complaintId}/comments`);
  }

  async uploadAttachment(complaintId: string, file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    return fetch(`/api${this.endpoint}/${complaintId}/attachments`, {
      method: 'POST',
      body: formData,
    }).then(res => res.json());
  }

  async getStatistics(): Promise<any> {
    return apiService.get<any>(`${this.endpoint}/statistics`);
  }

  async delete(id: string): Promise<void> {
    return apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}

export const complaintService = new ComplaintService();