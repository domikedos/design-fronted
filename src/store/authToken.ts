import { type APITokenState, type AuthTonTokenState, type AuthTgTokenState } from '../types/authToken';
import { create } from 'zustand';

export const useTokenStore = create<APITokenState>(set => ({
	accessToken: localStorage.getItem('api-access-token'),
	setAccessToken: (token) => {
		set({ accessToken: token });

		if (token) {
			localStorage.setItem('api-access-token', token);
		} else {
			localStorage.removeItem('api-access-token');
		}
	},
	resetToken: () => {
		set({ accessToken: null });
		localStorage.removeItem('api-access-token');
	},
}));

export const useTonTokenStore = create<AuthTonTokenState>(set => ({
    token: localStorage.getItem('ton-auth-token'),
    setToken: (token) => {
        set({ token: token });

        if (token) {
            localStorage.setItem('ton-auth-token', token);
        } else {
            localStorage.removeItem('ton-auth-token');
        }
    },
    resetToken: () => {
        set({ token: null });
        localStorage.removeItem('ton-auth-token');
    },
}));

export const useTgTokenStore = create<AuthTgTokenState>(set => ({
    token: localStorage.getItem('tg-auth-token'),
    setToken: (token) => {
        set({ token: token });

        if (token) {
            localStorage.setItem('tg-auth-token', token);
        } else {
            localStorage.removeItem('tg-auth-token');
        }
    },
    resetToken: () => {
        set({ token: null });
        localStorage.removeItem('tg-auth-token');
    },
}));