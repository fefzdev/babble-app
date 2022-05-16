import { getAuth, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import BabbleButton from '@/components/BabbleButton/BabbleButton';
import Background from '@/components/Background';

import RoleModal from '../FirstLogin/components/RoleModal';
const auth = getAuth();
function Settings() {
  const { type } = useSelector(state => state.user);
  const [modalVisible, setModalVisible] = useState(false);

  const onSubmit = () => {
    setModalVisible(false);
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
