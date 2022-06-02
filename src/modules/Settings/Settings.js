import { getAuth, signOut } from 'firebase/auth';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import Background from '@/components/Background';
import colors from '@/constants/Colors';
import useRepository from '@/database/Model';

import SettingsBlock from './components/SettingsBlock';
import UpdateNotifsModal from './components/UpdateNotifsModal';
import UpdateRoleModal from './components/UpdateRoleModal';
import useSettings from './data';
const auth = getAuth();

function Settings() {
  const settings = useSettings();
  const { uid } = useSelector(state => state.user);
  const { rooms } = useSelector(state => state.rooms);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [notifsModalVisible, setNotifsModalVisible] = useState(false);
  const { rooms: roomsRepo, userRepository } = useRepository();

  const onRoleSubmit = async userType => {
    Alert.alert(
      'Changement de rôle',
      'Êtes-vous sûr de vouloir changer de rôle ? Vos conversations actuelles seront fermées et perdues.',
      [
        {
          text: 'Oui, je veux changer de rôle',
          style: 'default',
          onPress: async () => await onRoleUpdate(userType),
        },
        {
          text: 'Non, annuler',
          style: 'cancel',
          onPress: () => null,
        },
      ],
    );
  };
  const onSignOut = () => {
    Alert.alert(
      'Se déconnecter ?',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        {
          text: 'Oui, me déconnecter',
          style: 'destructive',
          onPress: async () => signOut(auth),
        },
        {
          text: 'Non, annuler',
          style: 'default',
          onPress: () => null,
        },
      ],
    );
  };

  const onRoleUpdate = async userType => {
    setRoleModalVisible(false);
    await roomsRepo.deleteAllRooms(rooms, uid);
    await userRepository.updateData(uid, {
      type: userType,
      available: false,
    });
  };

  const handlerFunction = {
    setRoleModalVisible,
    setNotifsModalVisible,
    signOut: () => onSignOut(auth),
  };

  return (
    <Background style={styles.container}>
      {settings.map((group, id) => (
        <View style={styles.settingsBlock} key={id}>
          {group.map(({ text, icon, handle: { fn, prm } }) => (
            <SettingsBlock
              text={text}
              icon={icon}
              key={text}
              onPress={() => handlerFunction[fn](...prm)}
            />
          ))}
        </View>
      ))}
      <UpdateRoleModal
        isVisible={roleModalVisible}
        onClose={() => setRoleModalVisible(false)}
        onSubmit={onRoleSubmit}
      />
      <UpdateNotifsModal
        isVisible={notifsModalVisible}
        onClose={() => setNotifsModalVisible(false)}
      />
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  settingTitle: {
    marginBottom: 8,
    fontSize: 16,
    padding: 8,
    paddingBottom: 0,
    color: colors.orange[1000],
  },
  settingsBlock: {
    marginTop: 16,
    flex: 1,
    width: '100%',
    backgroundColor: colors.orange[200],
    borderRadius: 8,
  },
  settingContainer: {
    marginBottom: 20,
  },
});

export default Settings;
