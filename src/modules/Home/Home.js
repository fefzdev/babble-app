import Background from 'app/components/Background';
import { UserRoles } from 'app/constants/Roles';
import useRepository from 'app/database/Model';
import FirstLogin from 'app/modules/FirstLogin';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import BabbleButton from '../../components/BabbleButton/BabbleButton';
import RoleModal from '../FirstLogin/components/RoleModal';
import AvailableUsers from './components/AvailableUsers';
import Role from './components/Role/Role';
import WaitingList from './components/WaitingList';

function Home({ navigation }) {
  const userType = useSelector(state => state.user.type);
  const [modalVisible, setModalVisible] = useState(false);
  const userUID = useSelector(state => state.user.uid);
  const { userRepository } = useRepository();

  const styles = StyleSheet.create({});

  const onSubmit = type => {
    setModalVisible(false);
    userRepository.updateData(userUID, {
      type,
    });
  };

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
    <Background style={styles.background}>
      <BabbleButton onPress={() => navigation.navigate('Test2')}>
        Go to Test2
      </BabbleButton>
      <BabbleButton onPress={() => setModalVisible(true)}>
        Changer role
      </BabbleButton>
      <Role />
      {currentUserView()}
      <RoleModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={onSubmit}
      />
    </Background>
  );
}

export default Home;
