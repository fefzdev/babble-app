import {
  LinkingOptions,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import HeaderModule from '@/modules/Header';
import { RootStackParamList } from '@/types';

import routes from '../routes';

const Stack = createStackNavigator();

const buildRoutes = () =>
  routes.map((route, i) => (
    <Stack.Screen
      name={route.name}
      component={route.component}
      options={{
        header: headerProps => <HeaderModule headerProps={headerProps} />,
        headerShown: route.header,
      }}
      key={i}
    />
  ));

export default function UserStack({
  theme,
  linking,
}: {
  theme?: Theme;
  linking: LinkingOptions<RootStackParamList>;
}) {
  return (
    <NavigationContainer theme={theme} linking={linking}>
      <Stack.Navigator>{buildRoutes()}</Stack.Navigator>
    </NavigationContainer>
  );
}
