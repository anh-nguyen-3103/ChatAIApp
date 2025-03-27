import { asyncStorageService } from '@/src/services/asyncStorageService';
import { AppStateStatus } from 'react-native';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppState {
  appLifeCycleState: AppStateStatus;
}

interface AppActions {
  updateAppLifeCycleState: (state: AppStateStatus) => void;
  clearAllState: () => void;
}

const initialState: AppState = {
  appLifeCycleState: 'unknown',
};

type AppStore = AppState & AppActions;

export const useAppStore = create<AppStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      clearAllState: async () => {
        set({ ...initialState }, false, 'app/clearAllState');
        await asyncStorageService.remove('theme');
      },

      updateAppLifeCycleState: (state) => {
        set({ appLifeCycleState: state }, false, 'app/updateAppLifeCycleState');
      },
    }),
    { name: 'app-store' },
  ),
);

export const selectApp = (state: AppStore) => state;
