import BabbleButton from 'app/components/BabbleButton/BabbleButton';
import Background from 'app/components/Background';
import useRepository from 'app/database/Model';
import React, { useState } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import RoleModal from '../FirstLogin/components/RoleModal';

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
      <RoleModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={onSubmit}
      />
    </Background>
  );
}

export default Settings;
