import { getAuth, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import BabbleButton from '@/components/BabbleButton/BabbleButton';
import Background from '@/components/Background';
import useRepository from '@/database/Model';

import RoleModal from '../FirstLogin/components/RoleModal';
const auth = getAuth();
function Settings() {
  const { uid, type } = useSelector(state => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const { userRepository } = useRepository();

  const onSubmit = userType => {
    setModalVisible(false);
    userRepository.updateData(uid, {
      type: userType,
    });
  };

  return (
    <Background>
      <Text>{type}</Text>
      <BabbleButton onPress={() => setModalVisible(true)}>
        Changer role
      </BabbleButton>
      <BabbleButton onPress={() => signOut(auth)}>Disconnect</BabbleButton>
      <RoleModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={onSubmit}
      />
    </Background>
  );
}

export default Settings;
