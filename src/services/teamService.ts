import { Team, TeamFormData, TeamMember, TeamProject } from '../types/team';
import { apiService } from './api';

// Service spécialisé pour la gestion des équipes
export class TeamService {
  private readonly endpoint = '/teams';

  async getAll(): Promise<Team[]> {
    return apiService.get<Team[]>(this.endpoint);
  }

  async getById(id: string): Promise<Team> {
    return apiService.get<Team>(`${this.endpoint}/${id}`);
  }

  async getByDepartment(department: string): Promise<Team[]> {
    return apiService.get<Team[]>(`${this.endpoint}?department=${department}`);
  }

  async create(data: TeamFormData): Promise<Team> {
    return apiService.post<Team>(this.endpoint, data);
  }

  async update(id: string, data: Partial<TeamFormData>): Promise<Team> {
    return apiService.put<Team>(`${this.endpoint}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  async updateStatus(id: string, status: 'active' | 'inactive' | 'on_hold'): Promise<Team> {
    return apiService.put<Team>(`${this.endpoint}/${id}/status`, { status });
  }

  async assignTeamLeader(teamId: string, employeeId: string): Promise<Team> {
    return apiService.put<Team>(`${this.endpoint}/${teamId}/leader`, { employeeId });
  }

  async removeTeamLeader(teamId: string): Promise<Team> {
    return apiService.delete<Team>(`${this.endpoint}/${teamId}/leader`);
  }

  // Gestion des membres
  async addMember(teamId: string, employeeId: string): Promise<Team> {
    return apiService.post<Team>(`${this.endpoint}/${teamId}/members`, { employeeId });
  }

  async removeMember(teamId: string, employeeId: string): Promise<Team> {
    return apiService.delete<Team>(`${this.endpoint}/${teamId}/members/${employeeId}`);
  }

  async getMembers(teamId: string): Promise<TeamMember[]> {
    return apiService.get<TeamMember[]>(`${this.endpoint}/${teamId}/members`);
  }

  async updateMemberStatus(teamId: string, employeeId: string, isActive: boolean): Promise<Team> {
    return apiService.put<Team>(`${this.endpoint}/${teamId}/members/${employeeId}/status`, { isActive });
  }

  // Gestion des projets
  async addProject(teamId: string, project: Omit<TeamProject, 'id'>): Promise<Team> {
    return apiService.post<Team>(`${this.endpoint}/${teamId}/projects`, project);
  }

  async updateProject(teamId: string, projectId: string, project: Partial<TeamProject>): Promise<Team> {
    return apiService.put<Team>(`${this.endpoint}/${teamId}/projects/${projectId}`, project);
  }

  async removeProject(teamId: string, projectId: string): Promise<Team> {
    return apiService.delete<Team>(`${this.endpoint}/${teamId}/projects/${projectId}`);
  }

  // Statistiques et rapports
  async getTeamStatistics(teamId: string): Promise<any> {
    return apiService.get<any>(`${this.endpoint}/${teamId}/statistics`);
  }

  async getTeamPerformance(teamId: string): Promise<any> {
    return apiService.get<any>(`${this.endpoint}/${teamId}/performance`);
  }

  async getAllStatistics(): Promise<any> {
    return apiService.get<any>(`${this.endpoint}/statistics/overview`);
  }

  // Recherche d'employés disponibles
  async getAvailableEmployees(): Promise<any[]> {
    return apiService.get<any[]>('/employees/available-for-teams');
  }

  async getTeamLeaders(): Promise<any[]> {
    return apiService.get<any[]>('/employees?role=team_leader');
  }
}

export const teamService = new TeamService();