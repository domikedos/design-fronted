import { apiClient } from '../client';
import { Account, ConnectAdditionalRequest, TonProofItemReplySuccess } from '@tonconnect/ui-react';
import { TokenResponse, TonProofResponse } from '../types';
import { useTonTokenStore } from '../../store/authToken';

export const authService = {
  async generatePayload(): Promise<ConnectAdditionalRequest | null> {
    try {
      const response = await apiClient.post<TonProofResponse>('/api/ton-proof/generate-payload');

      return {
        tonProof: response.data.payload,
      };
    } catch (error) {
      console.error("Check proof error:", error);
      return null;
    }
  },

  async checkProof(proof: TonProofItemReplySuccess, account: Account): Promise<void> {
    try {
      const response = await apiClient.post<TokenResponse>('/api/ton-proof/check-proof', {
        address: account.address,
        network: account.chain,
        proof: {
          ...proof.proof,
          stateInit: account.walletStateInit,
        },
        publicKey: account.publicKey,
      });
  
      const token = response.data.token;
      if (token) {
        const { setToken } = useTonTokenStore.getState();
        setToken(token);
      }
    } catch (error) {
      console.error("Check proof error:", error);
    }
  },

  reset() {
		const { resetToken } = useTonTokenStore.getState();
		resetToken();
	}
}; 