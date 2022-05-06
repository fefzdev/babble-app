import BabbleButton from 'app/components/BabbleButton';
import Background from 'app/components/Background';
import Role from 'app/components/RoleBlock';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import ProfilePicture from './components/ProfilePicture';

function UserAccount({ navigation }) {
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      alignItems: 'center',
    },
    image: {},
  });

  return (
    <Background>
      <View style={styles.background}>
        <ProfilePicture />
        <Role />
        <BabbleButton>Modifier mon rôle</BabbleButton>
      </View>
    </Background>
  );
}

export default UserAccount;
