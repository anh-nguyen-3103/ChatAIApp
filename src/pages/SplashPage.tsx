import { Box } from '@/components/ui/box';
import { Spinner } from '@/components/ui/spinner';
import { selectAuth, useAuthStore } from '@/src/domain/store/useAuthStore';
import React, { useEffect } from 'react';
import colors from 'tailwindcss/colors';
import { useHapticNavigation } from '../hooks/hapticNavigation';
import { useColorScheme } from 'nativewind';

const SplashScreen = () => {
  const { replaceWithHaptic } = useHapticNavigation();
  const { refreshToken } = useAuthStore(selectAuth);
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      try {
        await refreshToken();
        replaceWithHaptic({ screen: 'Main', hapticType: 'impactLight' });
      } catch (error) {
        console.error('[SplashScreen/checkAuthAndNavigate/Failed]:', error);

        replaceWithHaptic({ screen: 'SignIn', hapticType: 'impactLight' });
      }
    };

    checkAuthAndNavigate();
  }, []);

  return (
    <Box className={`bg-primary-900 flex-1 justify-center items-center`}>
      <Spinner size='small' color={colorScheme !== 'dark' ? colors.white : colors.black} />
    </Box>
  );
};

export default SplashScreen;
