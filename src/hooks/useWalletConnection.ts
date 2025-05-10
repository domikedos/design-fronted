import { useEffect } from 'react';
import { useTonAddress, useTonConnectUI, useTonWallet, ConnectedWallet, CHAIN } from '@tonconnect/ui-react';
import { authService } from '../api/services/tonConnect';
import { useTonTokenStore } from '../store/authToken';

export const useWalletConnection = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const address = useTonAddress();

  useEffect(() => {
    const generatePayload = async () => {
      try {
        const response = await authService.generatePayload();

        if (response) {
            tonConnectUI.setConnectRequestParameters({
				state: 'ready',
				value: response,
			});
        } else {
            tonConnectUI.setConnectRequestParameters(null);
        }
      } catch (error) {
        console.error('Error generating payload:', error);
      }
    };

    if (!wallet) {
      generatePayload();
    }
  }, [wallet]);

  useEffect(() => {
    const handleStatusChange = async (w: ConnectedWallet | null) => {
        if (!w || w.account.chain === CHAIN.TESTNET) {
            authService.reset();
            return;
        }

        console.log(w.connectItems);

        if (
            w.connectItems?.tonProof &&
            'proof' in w.connectItems.tonProof
        ) {
            await authService.checkProof(
                w.connectItems.tonProof,
                w.account,
            );
        }

        const { token } = useTonTokenStore.getState();
        if (!token) {
            tonConnectUI.disconnect();
            return;
        }
    };

    return tonConnectUI.onStatusChange(handleStatusChange);
  }, [tonConnectUI, address]);

  return {
    wallet,
    tonConnectUI
  };
}; 