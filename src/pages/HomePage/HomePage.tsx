import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Spinner } from '@/components/ui/spinner';
import { useHapticNavigation } from '@/src/hooks/hapticNavigation';
import { selectAuth, useAuthStore } from '@/src/domain/store/useAuthStore';
import { useColorScheme } from 'nativewind';
import React from 'react';
import colors from 'tailwindcss/colors';

const HomePage = () => {
  const { logOut, isAuthLoading } = useAuthStore(selectAuth);
  const { replaceWithHaptic } = useHapticNavigation();
  const { colorScheme } = useColorScheme();

  const handleLogOut = async () => {
    try {
      await logOut();
      replaceWithHaptic({ screen: 'SignIn', hapticType: 'impactLight' });
    } catch (error) {
      console.error(`[HomePage/handleLogOut/Failed]:`, error);
    }
  };

  return (
    <Box className={`bg-primary-900 flex-1`}>
      <Center className='flex-1'>
        <Button size='md' variant='solid' action='primary' onPress={handleLogOut}>
          {isAuthLoading && (
            <Spinner size='small' color={colorScheme !== 'dark' ? colors.white : colors.black} />
          )}
        </Button>
      </Center>
    </Box>
  );
};

export default HomePage;
