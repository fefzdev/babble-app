import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { UserRoles } from '@/types/UserRoles.enums';

export default function InitialMessage({ name }) {
  const currentUser = useSelector(state => state.user);

  const welcomeText = () => {
    if (currentUser.type === UserRoles.LISTENER)
      return `Bienvenue, ${name} ! Vous écoutez actuellement un Talker, soyez bienveillant et amical.`;
    return `Bienvenue, ${currentUser.name} ! ${name} vous écoute actuellement. Vous êtes completement anonyme.`;
  };
  return <Text style={styles.container}>{welcomeText()}</Text>;
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
  },
});
