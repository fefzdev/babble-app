import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import BabbleButton from '@/components/BabbleButton/BabbleButton';
import Background from '@/components/Background';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import useRepository from '@/database/Model';
import { useAuthentication } from '@/hooks/useAuthentication';

import RoleModal from './components/RoleModal';

export default function FirstLogin() {
  const [modalVisible, setModalVisible] = useState(false);
  const { userRepository } = useRepository();
  const { user } = useAuthentication();

  const onSubmit = type => {
    setModalVisible(false);
    userRepository.updateData(user.uid, { type });
  };

  return (
    <Background style={styles.container} noScroll={true}>
      <Image
        style={styles.image}
        source={require('@/assets/images/home-first-connection.png')}
      />
      <View style={styles.content}>
        <Text style={[styles.title, Fonts.callout]}>Bienvenue sur Babble</Text>
        <Text style={styles.description}>
          Vous trouverez ici toutes vos conversations avec d'autres personnes.
          Commencez un chat et interagir avec les gens dans un endroit sûr.
        </Text>
      </View>
      <BabbleButton style={styles.button} onPress={() => setModalVisible(true)}>
        Commencez à discuter !
      </BabbleButton>
      <RoleModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={onSubmit}
      />
    </Background>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  container: {
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginTop: 32,
    alignItems: 'center',
  },
  title: {},
  description: {
    marginTop: 8,
    color: Colors.black[600],
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 32,
  },
  modal: {
    backgroundColor: Colors.black[600],
    width: '100%',
    top: 128,
    height: '100%',
  },
});
