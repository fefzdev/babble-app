import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import routes from './routes';

const Stack = createNativeStackNavigator();

const RouteBinding = () => {
  console.log(routes);
  const buildRoutes = () =>
    routes.map(route => (
      <Stack.Screen name={route.name} component={route.component} />
    ));

  return (
    <Stack.Navigator initialRouteName="Home">{buildRoutes()}</Stack.Navigator>
  );
};

export default RouteBinding;
