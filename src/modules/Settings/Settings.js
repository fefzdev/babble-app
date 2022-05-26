import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import BabbleButton from '@/components/BabbleButton';
import Background from '@/components/Background';
import colors from '@/constants/Colors';
import fonts from '@/constants/Fonts';
import useRepository from '@/database/Model';

import RoleModal from '../FirstLogin/components/RoleModal';
import SettingsBlock from './components/SettingsBlock';
import useSettings from './data';
const auth = getAuth();

function Settings() {
  const settings = useSettings();
  const { uid } = useSelector(state => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const { userRepository } = useRepository();

  const onSubmit = async userType => {
    setModalVisible(false);
    await userRepository.updateData(uid, {
      type: userType,
    });
  };

  const handlerFunction = {
    setModalVisible,
  };

  useEffect(() => console.log(settings));

  return (
    <Background>
      <BabbleButton onPress={() => signOut(auth)}>Disconnect</BabbleButton>
      {settings.map(({ title, subSettings }) => (
        <View style={styles.settingContainer} key={title}>
          <Text style={styles.settingTitle}>{title} :</Text>
          <View style={styles.subSettingContainer}>
            {subSettings.map(({ text, subtitle, handle: { fn, prm } }) => (
              <SettingsBlock
                text={text}
                title={subtitle}
                key={subtitle}
                onPress={() => handlerFunction[fn](...prm)}
              />
            ))}
          </View>
        </View>
      ))}
      <RoleModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={onSubmit}
      />
    </Background>
  );
}

const styles = StyleSheet.create({
  settingTitle: {
    ...fonts.xsTitle,
    marginBottom: 8,
  },
  subSettingContainer: {
    backgroundColor: colors.orange[200],
    borderRadius: 10,
    overflow: 'hidden',
  },
  settingContainer: {
    marginBottom: 20,
  },
});

export default Settings;
