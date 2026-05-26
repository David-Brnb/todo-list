import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

export type User = {
  id: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  hydrated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  hydrate: () => Promise<void>;
};

const TOKEN_KEY = 'auth.token';
const USER_KEY = 'auth.user';
const FAKE_TOKEN = 'FAKE_TOKEN_123';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  hydrated: false,

  signIn: async (email, password) => {
    if (!email.trim() || !password.trim()) {
      throw new Error('Email and password are required');
    }
    const user: User = { id: '1', email };
    await SecureStore.setItemAsync(TOKEN_KEY, FAKE_TOKEN);
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    set({ user, token: FAKE_TOKEN });
  },

  signOut: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
    set({ user: null, token: null });
  },

  hydrate: async () => {
    try {
      const [token, userRaw] = await Promise.all([
        SecureStore.getItemAsync(TOKEN_KEY),
        SecureStore.getItemAsync(USER_KEY),
      ]);
      const user = userRaw ? (JSON.parse(userRaw) as User) : null;
      set({ token, user });
    } finally {
      set({ hydrated: true });
    }
  },
}));
