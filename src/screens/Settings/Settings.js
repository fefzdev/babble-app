import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import HeaderModule from '@/modules/Header';
import SettingsModule from '@/modules/Settings';
import Account from '@/modules/Settings/screens/Account';
import Notifications from '@/modules/Settings/screens/Notifications';
import Role from '@/modules/Settings/screens/Role';

const Stack = createStackNavigator();

function Settings() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Paramètres"
        component={SettingsModule}
        options={{
          header: headerProps => <HeaderModule headerProps={headerProps} />,
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Role"
        component={Role}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Compte"
        component={Account}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default Settings;
