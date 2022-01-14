import React from 'react';

import BabbleButton from '../../../components/BabbleButton/BabbleButton';
import BabbleModal from '../../../components/BabbleModal';

function RoleModal({ isVisible, onClose, onSubmit }) {
  const styles = {
    button: {
      marginTop: 32,
    },
  };

  return (
    <BabbleModal isVisible={isVisible} onClose={onClose}>
      <BabbleButton style={styles.button} onPress={onClose}>
        Close
      </BabbleButton>
    </BabbleModal>
  );
}

export default RoleModal;
