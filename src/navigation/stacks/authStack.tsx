import {
  LinkingOptions,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AuthScreen from '@/modules/Auth';
import { RootStackParamList } from '@/types';

const Stack = createStackNavigator();

export default function AuthStack({
  theme,
  linking,
}: {
  theme?: Theme;
  linking: LinkingOptions<RootStackParamList>;
}) {
  return (
    <NavigationContainer theme={theme} linking={linking}>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
