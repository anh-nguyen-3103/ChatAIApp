import { appleAuth } from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { User } from '../domain/models/user';

GoogleSignin.configure({
  webClientId: '106699962759-rtlau35p97bf01cr2t9jq41u55bb019u.apps.googleusercontent.com',
  iosClientId: '106699962759-60cpm0jh3tqsavamg2n8pi09kcq2i0p4.apps.googleusercontent.com',
  offlineAccess: false,
});

export type SignInMethod = 'Google' | 'Apple';

export const authService = {
  signInWithGoogle: async (): Promise<User> => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const { data } = await GoogleSignin.signIn();

      if (!data) {
        throw new Error('Google Sign-In failed - no identity token returned');
      }

      console.log('[AuthServices/signInWithGoogle/Succeed]: ', data);

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: '123',
            username: 'google_user',
            email: 'user@example.com',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            avatar: 'https://example.com/avatar.jpg',
            access_token: 'mock-access-token',
            refresh_token: 'mock-refresh-token',
          });
        }, 2000);
      });
    } catch (error) {
      console.error('[AuthServices/signInWithGoogle/Failed]: ', error);
      throw new Error('Google Sign-In failed');
    }
  },

  signInWithApple: async (): Promise<User> => {
    try {
      const { identityToken, nonce } = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      if (!identityToken || !nonce) {
        throw new Error('Apple Sign-In failed - no identity token returned');
      }

      console.log('[AuthServices/signInWithGoogle/Succeed]: ', { identityToken, nonce });

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: '456',
            username: 'apple_user',
            email: 'apple-user@example.com',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            avatar: 'https://example.com/apple-avatar.jpg',
            access_token: 'mock-apple-access-token',
            refresh_token: 'mock-apple-refresh-token',
          });
        }, 2000);
      });
    } catch (error) {
      console.error('[AuthServices/signInWithApple/Failed]: ', error);
      throw new Error('Apple Sign-In failed');
    }
  },

  refreshToken: async (refreshToken: string): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '123',
          username: 'refreshed_user',
          email: 'user@example.com',
          isActive: true,
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
          avatar: 'https://example.com/avatar.jpg',
          access_token: 'new-access-token-' + Date.now(),
          refresh_token: 'new-refresh-token-' + Date.now(),
        });
      }, 2000);
    });
  },

  fetchDetailUser: async (accessToken: string): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '123',
          username: 'refreshed_user',
          email: 'user@example.com',
          isActive: true,
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
          avatar: 'https://example.com/avatar.jpg',
          access_token: 'new-access-token-' + Date.now(),
          refresh_token: 'new-refresh-token-' + Date.now(),
        });
      }, 2000);
    });
  },

  logout: async (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  },
};
