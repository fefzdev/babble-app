import BabbleButton from 'app/components/BabbleButton/BabbleButton';
import Background from 'app/components/Background';
import useRepository from 'app/database/Model';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import colors from '../../assets/style/colors';
import fonts from '../../assets/style/fonts';
import { UserRoles } from '../../constants/Roles';
import RoleModal from '../FirstLogin/components/RoleModal';
import SettingsBlock from './components/SettingsBlock';
import useSettings from './data';

function Settings() {
  const [settings] = useSettings();
  const { uid } = useSelector(state => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const { userRepository } = useRepository();

  const onSubmit = userType => {
    setModalVisible(false);
    userRepository.updateData(uid, {
      type: userType,
    });
  };

  const handlerFunction = {
    setModalVisible,
  };

  return (
    <Background>
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
