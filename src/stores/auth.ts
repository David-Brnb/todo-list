import { UserDTO } from '@/types/users/userDTO';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

type AuthState = {
  user: UserDTO | null;
  token: string | null;
  hydrated: boolean;
  signIn: (user: UserDTO, token: string) => Promise<void>;
  signOut: () => Promise<void>;
  hydrate: () => Promise<void>;
};

const TOKEN_KEY = 'auth.token';
const USER_KEY = 'auth.user';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  hydrated: false,

  signIn: async (user, token) => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    set({ user, token });
  },

  signOut: async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
    set({ user: null, token: null });
  },

  hydrate: async () => {
    try {
      const [token, userRaw] = await Promise.all([
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(USER_KEY),
      ]);
      const user = userRaw ? (JSON.parse(userRaw) as UserDTO) : null;
      set({ token, user });
    } finally {
      set({ hydrated: true });
    }
  },
}));
