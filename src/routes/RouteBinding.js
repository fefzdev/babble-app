import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderModule from 'app/modules/Header';
import React from 'react';

import routes from './routes';

const Stack = createNativeStackNavigator();

const RouteBinding = () => {
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

  return (
    <Stack.Navigator initialRouteName="Home">{buildRoutes()}</Stack.Navigator>
  );
};

export default RouteBinding;
