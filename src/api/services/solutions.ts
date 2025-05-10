import { apiClient } from '../client';
import { ApiResponse, Solution, PaginatedResponse } from '../types';

export const solutionsService = {
  async getSolutions(page = 1, size = 10): Promise<ApiResponse<PaginatedResponse<Solution>>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Solution>>>('/api/v1/solutions', {
      params: { page, size },
    });
    return response.data;
  },

  async getSolution(id: number): Promise<ApiResponse<Solution>> {
    const response = await apiClient.get<ApiResponse<Solution>>(`/api/v1/solutions/${id}`);
    return response.data;
  },

  async createSolution(submissionId: number, title: string, description: string): Promise<ApiResponse<Solution>> {
    const response = await apiClient.post<ApiResponse<Solution>>('/api/v1/solutions', {
      submission_id: submissionId,
      title,
      description,
    });
    return response.data;
  },

  async likeSolution(id: number): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>(`/api/v1/solutions/${id}/like`);
    return response.data;
  },

  async unlikeSolution(id: number): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(`/api/v1/solutions/${id}/like`);
    return response.data;
  },
}; 