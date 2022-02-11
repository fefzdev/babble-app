import Background from 'app/components/Background';
import Role from 'app/components/RoleBlock';
import useRepository from 'app/database/Model';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import BabbleButton from '../../components/BabbleButton/BabbleButton';
import RoleModal from '../FirstLogin/components/RoleModal';
import AvailableUsers from './components/AvailableUsers';
import WaitingList from './components/WaitingList';

function TalkerHome({ navigation }) {
  const { uid } = useSelector(state => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const { userRepository } = useRepository();

  const styles = StyleSheet.create({
    loader: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
  });

  const onSubmit = userType => {
    setModalVisible(false);
    console.log(userType);
    userRepository.updateData(uid, {
      type: userType,
    });
  };

  return (
    <Background style={styles.background}>
      <BabbleButton onPress={() => navigation.navigate('Test2')}>
        Go to Test2
      </BabbleButton>
      <BabbleButton onPress={() => setModalVisible(true)}>
        Changer role
      </BabbleButton>
      <Role />
      <View>
        <AvailableUsers />
        <WaitingList />
      </View>
      <RoleModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={onSubmit}
      />
    </Background>
  );
}

export default TalkerHome;
