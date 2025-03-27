import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User } from '../models/user';
import { asyncStorageService } from '../../services/asyncStorageService';
import { SignInMethod, authService } from '../../services/authServices';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}

interface AuthActions {
  signIn: ({ type }: { type: SignInMethod }) => Promise<User>;
  refreshToken: () => Promise<User>;
  fetchUser: () => Promise<User>;
  updateUser: ({ user }: { user: Partial<User> }) => Promise<User>;
  clearAllState: () => void;
  logOut: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isAuthLoading: false,
};

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      clearAllState: async () => {
        await asyncStorageService.remove('user');
        set(initialState, false, 'auth/clearAllState');
      },

      signIn: async ({ type }: { type: SignInMethod }) => {
        set({ isAuthLoading: true }, false, 'auth/signIn/loading');

        try {
          // Get user based on sign-in method
          const user =
            type === 'Google'
              ? await authService.signInWithGoogle()
              : await authService.signInWithApple();

          await asyncStorageService.set('user', JSON.stringify(user));

          set(
            {
              user,
              isAuthenticated: true,
              isAuthLoading: false,
            },
            false,
            'auth/signIn/success',
          );

          return user;
        } catch (error) {
          console.error(`[AuthStore/signIn/${type}/Failed]:`, error);
          set({ isAuthLoading: false }, false, 'auth/signIn/error');
          throw error;
        }
      },

      logOut: async () => {
        set({ isAuthLoading: true }, false, 'auth/logOut/loading');

        try {
          await authService.logout();
          await asyncStorageService.remove('user');

          set({ ...initialState, isAuthLoading: false }, false, 'auth/logOut/success');
        } catch (error) {
          console.error('[AuthStore/logOut/Failed]:', error);
          set({ isAuthLoading: false }, false, 'auth/logOut/error');
          throw error;
        }
      },

      refreshToken: async () => {
        const storedUser = await asyncStorageService.get<User>('user');

        if (!storedUser) {
          const error = new Error('No refresh token available');
          console.error('[AuthStore/refreshToken/Failed]:', error);
          throw error;
        }

        set({ isAuthLoading: true }, false, 'auth/refreshToken/loading');

        try {
          const updatedUser = await authService.refreshToken(storedUser.refresh_token);
          await asyncStorageService.set('user', JSON.stringify(updatedUser));

          set(
            {
              user: updatedUser,
              isAuthenticated: true,
              isAuthLoading: false,
            },
            false,
            'auth/refreshToken/success',
          );

          return updatedUser;
        } catch (error) {
          console.error('[AuthStore/refreshToken/Failed]:', error);
          set({ isAuthLoading: false }, false, 'auth/refreshToken/error');
          throw error;
        }
      },

      updateUser: async ({ user: partialUser }: { user: Partial<User> }) => {
        const currentUser = get().user;

        if (!currentUser) {
          const error = new Error('No user found to update');
          console.error('[AuthStore/updateUser/Failed]:', error);
          throw error;
        }

        try {
          const updatedUser = { ...currentUser, ...partialUser };
          await asyncStorageService.set('user', JSON.stringify(updatedUser));

          set({ user: updatedUser }, false, 'auth/updateUser/success');
          return updatedUser;
        } catch (error) {
          console.error('[AuthStore/updateUser/Failed]:', error);
          throw error;
        }
      },

      fetchUser: async () => {
        const storedUser = await asyncStorageService.get<User>('user');

        if (!storedUser?.access_token) {
          const error = new Error('No access token available');
          console.error('[AuthStore/fetchUser/Failed]:', error);
          throw error;
        }

        set({ isAuthLoading: true }, false, 'auth/fetchUser/loading');

        try {
          const user = await authService.fetchDetailUser(storedUser.access_token);
          await asyncStorageService.set('user', JSON.stringify(user));

          set(
            {
              user,
              isAuthenticated: true,
              isAuthLoading: false,
            },
            false,
            'auth/fetchUser/success',
          );

          return user;
        } catch (error) {
          console.error('[AuthStore/fetchUser/Failed]:', error);
          set({ isAuthLoading: false }, false, 'auth/fetchUser/error');
          throw error;
        }
      },
    }),
    { name: 'auth-store' },
  ),
);

export const selectAuth = (state: AuthStore) => state;
