import { Alert, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import SettingsList from '@/components/SettingsList';
import Colors from '@/constants/Colors';

export default function RoomOptionsPopup({ isVisible, onClose, onDelete }) {
  const onRoomDelete = () => {
    Alert.alert(
      'Supprimer la conversation ?',
      'Êtes-vous sûr de vouloir supprimer cette conversation ? Cette action est irréversible.',
      [
        {
          text: 'Oui, supprimer',
          style: 'default',
          onPress: async () => onDelete(),
        },
        {
          text: 'Non, annuler',
          style: 'cancel',
          onPress: () => null,
        },
      ],
    );
  };

  const settingsList = [
    {
      icon: 'trash',
      text: 'Supprimer la conversation',
      action: () => onRoomDelete(),
    },
  ];

  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropColor="transparent"
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      animationInTiming={300}
      animationOutTiming={300}>
      <SettingsList style={styles.container} list={settingsList} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.orange[200],
    borderRadius: 8,
    position: 'absolute',
    marginTop: 0,
    top: 120,
    right: 20,
    width: 300,
  },
});
