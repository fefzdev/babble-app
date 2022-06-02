import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import BabbleButton from '@/components/BabbleButton';
import BabbleInfoBox from '@/components/BabbleInfoBox';
import BabbleLoader from '@/components/BabbleLoader';
import Background from '@/components/Background';
import SubScreenHeader from '@/components/SubScreenHeader';
import useRepository from '@/database/Model';
import { UserRoles } from '@/types/UserRoles.enums';

export default function Role({ navigation }) {
  const { type, uid } = useSelector(state => state.user);
  const { rooms } = useSelector(state => state.rooms);
  const { rooms: roomsRepo, userRepository } = useRepository();
  const [isLoading, setIsLoading] = useState(false);

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

  const onRoleChange = async type => {
    Alert.alert(
      'Changement de rôle',
      'Êtes-vous sûr de vouloir changer de rôle ? Vos conversations actuelles seront fermées et perdues.',
      [
        {
          text: 'Oui, je veux changer de rôle',
          style: 'default',
          onPress: () => {
            updateRole(type);
          },
        },
        {
          text: 'Non, annuler',
          style: 'cancel',
          onPress: () => null,
        },
      ],
    );
  };

  const updateRole = async userType => {
    setIsLoading(true);
    await roomsRepo.deleteAllRooms(rooms, uid);
    await userRepository.updateData(uid, {
      type: userType,
      available: false,
    });
    setIsLoading(false);
  };

  if (isLoading) return <BabbleLoader />;

  return (
    <Background style={styles.container} noScroll>
      <SubScreenHeader navigation={navigation} title="Votre rôle" />
      <View style={styles.body}>
        <Image style={styles.image} source={image()} />
        {text()}
      </View>
      <View>
        <BabbleInfoBox
          style={styles.infoBox}
          content="En changeant de rôle vous perdrez toutes vos conversations actuelles !"
        />
        <BabbleButton
          style={styles.button}
          onPress={() =>
            onRoleChange(
              type === UserRoles.TALKER ? UserRoles.LISTENER : UserRoles.TALKER,
            )
          }>
          Changer de rôle en {type !== UserRoles.TALKER ? 'Talker' : 'Listener'}
        </BabbleButton>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 32,
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
    marginTop: 20,
  },
});
