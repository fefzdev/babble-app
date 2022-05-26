import Icon from '@expo/vector-icons/Entypo';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import BabbleInput from '@/components/BabbleInput';
import BabbleModal from '@/components/BabbleModal';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import useRepository from '@/database/Model';
import { UserRoles } from '@/types/UserRoles.enums';

export default function NameEditModal({ isDisplayed, onClose }) {
  const { name, uid, type } = useSelector(state => state.user);
  const [nameInput, setNameInput] = useState(name);
  const { userRepository } = useRepository();

  const onPopupClose = async newName => {
    if (newName) await userRepository.updateData(uid, { name: newName });
    setNameInput(name);
    onClose();
  };

  const infoMessage = () => {
    if (type === UserRoles.LISTENER)
      return 'En tant que Listener, votre nom sera visible par les autres utilisateurs';
    return 'En tant que Talker, votre nom ne sera pas visible par les autres utilisateurs. Vous restez complètement anonyme.';
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
        <View style={styles.infoBox}>
          <Icon
            style={styles.icon}
            name="info"
            size={16}
            color={Colors.orange[1000]}
          />
          <Text style={styles.infoBoxText}>{infoMessage()}</Text>
        </View>
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
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.orange[200],
    borderRadius: 8,
    marginTop: 8,
  },
  icon: {
    marginRight: 16,
  },
  infoBoxText: {
    flexShrink: 1,
    color: Colors.orange[1000],
  },
});
