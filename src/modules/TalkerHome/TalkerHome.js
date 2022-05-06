import Background from 'app/components/Background';
import Role from 'app/components/RoleBlock';
import React from 'react';
import { View } from 'react-native';

import AvailableUsers from './components/AvailableUsers';
import WaitingList from './components/WaitingList';

function TalkerHome({ navigation }) {
  return (
    <Background noScroll>
      <Role />
      <View>
        <AvailableUsers />
        <WaitingList navigation={navigation} />
      </View>
    </Background>
  );
}

export default TalkerHome;
