import { asyncStorageService } from '@/src/services/asyncStorageService';
import { OverlayProvider } from '@gluestack-ui/overlay';
import { ToastProvider } from '@gluestack-ui/toast';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { View, ViewProps } from 'react-native';
import { config } from './config';

export function GluestackUIProvider({
  ...props
}: {
  children?: React.ReactNode;
  style?: ViewProps['style'];
}) {
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    asyncStorageService.set('colorScheme', colorScheme);
  }, [colorScheme]);

  return (
    <View style={[config[colorScheme!], { flex: 1, height: '100%', width: '100%' }, props.style]}>
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}
