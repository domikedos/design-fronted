import { apiClient } from '../client';
import { ApiResponse, User } from '../types';

export const authService = {
  async register(telegramToken: string, tonProofToken: string): Promise<ApiResponse<{ token: string }>> {
    const response = await apiClient.post<ApiResponse<{ token: string }>>('/api/v1/auth/register', {
      telegram_token: telegramToken,
      ton_proof_token: tonProofToken,
    });
    return response.data;
  },

  async getTonProofPayload(): Promise<ApiResponse<{ payload: string }>> {
    const response = await apiClient.get<ApiResponse<{ payload: string }>>('/api/v1/ton/proof/payload');
    return response.data;
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await apiClient.get<ApiResponse<User>>('/api/v1/users/me');
    return response.data;
  },
}; 