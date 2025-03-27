import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';
import { SignInPage, SplashPage } from '../pages';
import { DrawerNavigation } from './drawerNavigation';
import { RootParamList } from './rootPramList';

const rootOptions: NativeStackNavigationOptions = {
  gestureEnabled: true,
  fullScreenGestureEnabled: true,
  header: () => null,
  animation: 'fade',
  animationDuration: 300,
};

const RootStack = createNativeStackNavigator<RootParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={rootOptions} initialRouteName={'Splash'}>
        <RootStack.Screen name={'Splash'} component={SplashPage} />
        <RootStack.Screen name={'SignIn'} component={SignInPage} />
        <RootStack.Screen name={'Main'} component={DrawerNavigation} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { RootNavigation, RootStack };
