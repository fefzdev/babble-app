import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import BabbleButton from '@/components/BabbleButton';
import BabbleInfoBox from '@/components/BabbleInfoBox';
import BabbleModal from '@/components/BabbleModal';
import { View } from '@/components/Themed';
import Fonts from '@/constants/Fonts';
import { UserRoles } from '@/types/UserRoles.enums';

export default function UpdateRoleModal({ isVisible, onClose, onSubmit }) {
  const { type } = useSelector(state => state.user);

  const text = () => {
    if (type === UserRoles.LISTENER)
      return (
        <Text style={styles.text}>
          Vous êtes actuellement connecté en tant que
          <Text style={styles.role}> Listeners. </Text>
          Vous êtes ici pour écouter et discuter avec des
          <Text style={styles.role}> Talkers</Text> dans le besoin d'une oreille
          attentive.
        </Text>
      );
    return (
      <Text style={styles.text}>
        Vous êtes actuellement connecté en tant que
        <Text style={styles.role}> Talker. </Text>
        Des
        <Text style={styles.role}> Listeners</Text> sont là pour vous écouter et
        vous conseiller quelque soit votre problème.
      </Text>
    );
  };
  const image = () => {
    if (type === UserRoles.LISTENER)
      return require('../assets/listener-image.png');
    return require('../assets/talker-image.png');
  };

  return (
    <BabbleModal
      isVisible={isVisible}
      onClose={onClose}
      style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity style={styles.action} onPress={() => onClose()}>
          <Text>Annuler</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Votre rôle</Text>
        <View style={styles.action} />
      </View>
      <Image style={styles.image} source={image()} />
      {text()}
      <BabbleInfoBox
        style={styles.infoBox}
        content="En changeant de rôle vous perdrez toutes vos conversations actuelles !"
      />
      <BabbleButton
        style={styles.button}
        onPress={() =>
          onSubmit(
            type === UserRoles.TALKER ? UserRoles.LISTENER : UserRoles.TALKER,
          )
        }>
        Changer de rôle en {type !== UserRoles.TALKER ? 'Talker' : 'Listener'}
      </BabbleButton>
    </BabbleModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 4,
  },
  action: {
    width: '20%',
  },
  title: {
    ...Fonts.title,
    textAlign: 'center',
  },
  image: {
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
  text: {
    marginTop: 24,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
  },
  role: {
    fontWeight: 'bold',
  },
  infoBox: {
    marginTop: 24,
  },
  button: {
    marginTop: 24,
  },
});
