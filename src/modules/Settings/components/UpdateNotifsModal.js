import { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity } from 'react-native';

import BabbleModal from '@/components/BabbleModal';
import { View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

import SettingsBlock from './SettingsBlock';

export default function UpdateNotifsModal({ isVisible, onClose }) {
  const [wantRoomNotifs, setWantRoomNotifs] = useState(false);
  const [wantMessageNotifs, setWantMessageNotifs] = useState(false);

  return (
    <BabbleModal
      isVisible={isVisible}
      onClose={onClose}
      style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity style={styles.action} onPress={() => onClose()}>
          <Text>Annuler</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.action} />
      </View>
      <View style={styles.settingsBlock}>
        <SettingsBlock
          onPress={() => setWantMessageNotifs(!wantMessageNotifs)}
          style={styles.settingBlock}
          text="Nouveaux messages"
          icon="chat"
          right={
            <Switch
              style={styles.switch}
              value={wantMessageNotifs}
              onValueChange={setWantMessageNotifs}
            />
          }
        />
      </View>
      <View style={styles.settingsBlock}>
        <SettingsBlock
          onPress={() => setWantRoomNotifs(!wantRoomNotifs)}
          style={styles.settingBlock}
          text="Nouvelles demandes"
          right={
            <Switch
              style={styles.switch}
              value={wantRoomNotifs}
              onValueChange={setWantRoomNotifs}
            />
          }
          icon="mail"
        />
      </View>
    </BabbleModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
  settingsBlock: {
    marginTop: 16,
    width: '100%',
    backgroundColor: Colors.orange[200],
    borderRadius: 8,
  },
  settingBlock: {
    flex: 0,
  },
});
