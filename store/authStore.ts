import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { signIn as authSignIn, signUp as authSignUp, signOut as authSignOut } from '@/lib/auth';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  verified: boolean;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  emailVisibility: boolean;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    avatar?: { uri: string; name: string; type: string };
  }) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: AuthUser | null, token: string | null) => void;
  clearAuth: () => void;
}

// Custom storage adapter for Zustand using Expo SecureStore
const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(name);
    } catch (error) {
      console.error('Error getting item from SecureStore:', error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(name, value);
    } catch (error) {
      console.error('Error setting item in SecureStore:', error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(name);
    } catch (error) {
      console.error('Error removing item from SecureStore:', error);
    }
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      setUser: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: !!user && !!token,
        }),

      signIn: async (email: string, password: string) => {
        try {
          set({ isLoading: true });
          const authData = await authSignIn(email, password);

          set({
            user: authData.record,
            token: authData.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signUp: async (data) => {
        try {
          set({ isLoading: true });
          const authData = await authSignUp(data);

          set({
            user: authData.record,
            token: authData.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signOut: async () => {
        try {
          await authSignOut();
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        } catch (error) {
          console.error('Sign out error:', error);
        }
      },

      clearAuth: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
