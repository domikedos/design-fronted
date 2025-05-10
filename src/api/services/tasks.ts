import { apiClient } from '../client';
import { ApiResponse, Task, PaginatedResponse } from '../types';

export const tasksService = {
  async getTasks(page = 1, size = 10): Promise<ApiResponse<PaginatedResponse<Task>>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Task>>>('/api/v1/tasks', {
      params: { page, size },
    });
    return response.data;
  },

  async getTask(id: number): Promise<ApiResponse<Task>> {
    const response = await apiClient.get<ApiResponse<Task>>(`/api/v1/tasks/${id}`);
    return response.data;
  },

  async submitSolution(taskId: number, code: string, lang: string): Promise<ApiResponse<{ submission_id: number }>> {
    const response = await apiClient.post<ApiResponse<{ submission_id: number }>>(`/api/v1/tasks/${taskId}/submit`, {
      code,
      lang,
    });
    return response.data;
  },
}; 