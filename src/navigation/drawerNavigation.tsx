import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import React from 'react';
import Drawer from '../components/drawer/Drawer';
import HeaderDrawer from '../components/drawer/HeaderDrawer';
import { HomePage, ProfilePage, SettingsPage } from '../pages';
import HapticFeedback from '../utils/funcs/hapticFeedback';
import { MainParamList } from './rootPramList';

const drawerOptions: DrawerNavigationOptions = {
  drawerType: 'front',
  swipeEnabled: true,
  drawerStyle: { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
  header: (props) => <HeaderDrawer props={props} />,
  overlayColor: '#0000004d',
};

const DrawerStack = createDrawerNavigator<MainParamList>();

const DrawerNavigation = () => {
  const drawerContent = (props: DrawerContentComponentProps) => <Drawer {...props} />;

  const handleDrawerStateChange = (e: { data: { state: { history: { type: string }[] } } }) => {
    const isDrawerOpen = e.data.state.history?.[0]?.type === 'drawer';
    if (isDrawerOpen) {
      HapticFeedback.trigger('impactLight');
    }
  };

  return (
    <DrawerStack.Navigator
      initialRouteName={'Home'}
      screenOptions={drawerOptions}
      screenListeners={{ state: handleDrawerStateChange }}
      drawerContent={drawerContent}
    >
      <DrawerStack.Screen name={'Home'} component={HomePage} />
      <DrawerStack.Screen name={'Profile'} component={ProfilePage} />
      <DrawerStack.Screen name={'Settings'} component={SettingsPage} />
    </DrawerStack.Navigator>
  );
};

export { DrawerNavigation, DrawerStack };
