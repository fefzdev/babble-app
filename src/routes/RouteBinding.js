import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import routes from './routes';

const Stack = createNativeStackNavigator();

const RouteBinding = () => {
  const buildRoutes = () =>
    routes.map((route, i) => (
      <Stack.Screen
        name={route.name}
        component={route.component}
        options={{ headerShown: route.header }}
        key={i}
      />
    ));

  return (
    <Stack.Navigator initialRouteName="Home">{buildRoutes()}</Stack.Navigator>
  );
};

export default RouteBinding;
