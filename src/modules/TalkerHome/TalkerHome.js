import Background from 'app/components/Background';
import Role from 'app/components/RoleBlock';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import AvailableUsers from './components/AvailableUsers';
import WaitingList from './components/WaitingList';

function TalkerHome({ navigation }) {
  const styles = StyleSheet.create({
    loader: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
  });

  return (
    <Background style={styles.background}>
      <Role />
      <View>
        <AvailableUsers />
        <WaitingList />
      </View>
    </Background>
  );
}

export default TalkerHome;
