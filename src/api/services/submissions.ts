import { apiClient } from '../client';
import { ApiResponse, Submission, PaginatedResponse } from '../types';

export const submissionsService = {
  async getSubmissions(page = 1, size = 10): Promise<ApiResponse<PaginatedResponse<Submission>>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Submission>>>('/api/v1/submissions', {
      params: { page, size },
    });
    return response.data;
  },

  async getSubmission(id: number): Promise<ApiResponse<Submission>> {
    const response = await apiClient.get<ApiResponse<Submission>>(`/api/v1/submissions/${id}`);
    return response.data;
  },

  async getTaskSubmissions(taskId: number, page = 1, size = 10): Promise<ApiResponse<PaginatedResponse<Submission>>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Submission>>>(`/api/v1/tasks/${taskId}/submissions`, {
      params: { page, size },
    });
    return response.data;
  },
}; 