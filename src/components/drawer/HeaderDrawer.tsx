import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Icon, MenuIcon, MessageCircleIcon } from '@/components/ui/icon';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import { useColorScheme } from 'nativewind';
import React, { FC } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from 'tailwindcss/colors';

type HeaderDrawerProps = {
  props: DrawerHeaderProps;
};

const HeaderDrawer: FC<HeaderDrawerProps> = ({ props }) => {
  const { navigation, route } = props;
  const { colorScheme } = useColorScheme();
  const { top } = useSafeAreaInsets();
  const handleOpenDrawer = () => navigation.openDrawer();
  const handleCreateNewSession = () => {};

  return (
    <Box
      className='bg-primary-900 flex-row items-center justify-between px-2 pb-2'
      style={{ paddingTop: top }}
    >
      <Button
        className='flex-row items-center rounded-full bg-transparent w-10 h-10 d-flex'
        onPress={handleOpenDrawer}
        action='secondary'
      >
        <Icon
          as={MenuIcon}
          className='w-6 h-6'
          color={colorScheme !== 'dark' ? colors.white : colors.black}
        />
      </Button>
      <Button
        className='flex-row items-center rounded-full bg-transparent w-10 h-10 d-flex'
        action='secondary'
        onPress={handleCreateNewSession}
      >
        <Icon
          as={MessageCircleIcon}
          className='w-6 h-6'
          color={colorScheme !== 'dark' ? colors.white : colors.black}
        />
      </Button>
    </Box>
  );
};

export default HeaderDrawer;
