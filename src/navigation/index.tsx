/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import HeaderModule from '@/modules/Header';
import { RootStackParamList } from '@/types/index';

import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
import routes from './routes';

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

const RootNavigator = () => (
  <Stack.Navigator initialRouteName="Home">{buildRoutes()}</Stack.Navigator>
);
