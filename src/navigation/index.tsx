/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { useAuthentication } from '@/hooks/useAuthentication';

import LinkingConfiguration from './LinkingConfiguration';
import AuthStack from './stacks/authStack';
import UserStack from './stacks/userStack';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const { user } = useAuthentication();
  if (user)
    return (
      <UserStack
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      />
    );
  return (
    <AuthStack
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    />
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
