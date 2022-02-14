import { UserRoles } from 'app/constants/Roles';
import React from 'react';

import BabbleButton from '../../../components/BabbleButton/BabbleButton';
import BabbleModal from '../../../components/BabbleModal';

function RoleModal({ isVisible, onClose, onSubmit }) {
  const styles = {
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingHorizontal: 8,
    },
    button: {
      marginTop: 32,
      flexGrow: 1,
      marginHorizontal: 8,
    },
  };

  return (
    <BabbleModal
      isVisible={isVisible}
      onClose={onClose}
      style={styles.container}>
      <BabbleButton
        style={styles.button}
        onPress={() => onSubmit(UserRoles.TALKER)}>
        I need to talk
      </BabbleButton>
      <BabbleButton
        style={styles.button}
        onPress={() => onSubmit(UserRoles.LISTENER)}>
        I want to listen
      </BabbleButton>
    </BabbleModal>
  );
}

export default RoleModal;