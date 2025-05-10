export interface APITokenState {
	accessToken: string | null;
	setAccessToken: (token: string | null) => void;
	resetToken: () => void;
}

export interface AuthTonTokenState {
	token: string | null;
	setToken: (token: string | null) => void;
	resetToken: () => void;
}

export interface AuthTgTokenState {
	token: string | null;
	setToken: (token: string | null) => void;
	resetToken: () => void;
}