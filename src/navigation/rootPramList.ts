import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Root stack navigation params
export type RootParamList = {
  Splash: undefined;
  SignIn: undefined;
  Main: undefined; // This will contain the Drawer Navigator
};

// Main navigation params (used for both Drawer and Stack)
export type MainParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

// Combined navigation type for stack and drawer
export type AppNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootParamList>,
  DrawerNavigationProp<MainParamList>
>;

// Helper type for route params
export type AppRouteProp<T extends keyof RootParamList | keyof MainParamList> = RouteProp<
  RootParamList & MainParamList,
  T
>;

// Utility type for screen names
export type AppScreens = keyof RootParamList | keyof MainParamList;
