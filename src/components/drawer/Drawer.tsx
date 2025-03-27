import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

type DrawerProps = {} & DrawerContentComponentProps;

const Drawer: FC<DrawerProps> = ({}) => {
  return <View className={`bg-primary-800 flex-1`}></View>;
};

export default Drawer;
