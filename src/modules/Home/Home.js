import Background from 'app/components/Background';
import { UserRoles } from 'app/constants/Roles';
import FirstLogin from 'app/modules/FirstLogin';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import AvailableUsers from './components/AvailableUsers';
import Role from './components/Role/Role';
import WaitingList from './components/WaitingList';

function Home() {
  const userType = useSelector(state => state.user.type);

  const talkerView = () => (
    <View>
      <AvailableUsers />
      <WaitingList />
    </View>
  );

  const currentUserView = () => {
    if (userType === UserRoles.TALKER) return talkerView();
    if (userType === UserRoles.LISTENER) return;
  };

  if (!userType) return <FirstLogin />;

  return (
    <Background>
      <Role />
      {currentUserView()}
    </Background>
  );
}

export default Home;
