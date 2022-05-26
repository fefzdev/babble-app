import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import BabbleInput from '@/components/BabbleInput';
import BabbleModal from '@/components/BabbleModal';
import Fonts from '@/constants/Fonts';
import useRepository from '@/database/Model';

export default function NameEditModal({ isDisplayed, onClose }) {
  const { name, uid } = useSelector(state => state.user);
  const [nameInput, setNameInput] = useState(name);
  const { userRepository } = useRepository();

  const onPopupClose = async newName => {
    if (newName) await userRepository.updateData(uid, { name: newName });
    setNameInput(name);
    onClose();
  };

  return (
    <BabbleModal
      isVisible={isDisplayed}
      onClose={() => onClose()}
      canBeSwiped={false}
      style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.head}>
          <TouchableOpacity onPress={() => onPopupClose()}>
            <Text style={styles.cancel}>Annuler</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Votre nom</Text>
          <TouchableOpacity onPress={() => onPopupClose(nameInput)}>
            {<Text style={styles.cancel}>Valider</Text>}
          </TouchableOpacity>
        </View>
        <BabbleInput
          style={styles.input}
          value={nameInput}
          placeholder="Votre nom"
          onChangeText={text => setNameInput(text)}
        />
      </View>
    </BabbleModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    width: '100%',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 4,
  },
  title: {
    ...Fonts.title,
  },
});
