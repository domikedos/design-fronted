import { TonConnectButton } from '@tonconnect/ui-react';
import { type FC } from 'react';

interface IConnectWalletProps {
	className?: string;
}

export const ConnectWalletButton: FC<IConnectWalletProps> = ({ className }) => {
	return <TonConnectButton className={className} />;
};