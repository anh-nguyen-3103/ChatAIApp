import { selectApp, useAppStore } from '@/src/domain/store/useAppStore';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useRef } from 'react';
import { AppState, StatusBar, View } from 'react-native';

type AppStateWrapperType = {
  children?: React.ReactNode;
};

const AppStateWrapper = (props: AppStateWrapperType) => {
  const appState = useRef(AppState.currentState);
  const { updateAppLifeCycleState } = useAppStore(selectApp);
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.info('[AppStateWrapper]: App has come to the foreground!');
      } else if (nextAppState.match(/inactive|background/)) {
        console.info('[AppStateWrapper]: App has gone to the background!');
      }

      appState.current = nextAppState;
      updateAppLifeCycleState(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return <View className={`flex-1 bg-background-${colorScheme}`}>{props.children}</View>;
};

export default AppStateWrapper;
