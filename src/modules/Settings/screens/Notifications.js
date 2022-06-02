import { useState } from 'react';
import { StyleSheet, Switch } from 'react-native';

import Background from '@/components/Background';
import SubScreenHeader from '@/components/SubScreenHeader';
import { View } from '@/components/Themed';
import Colors from '@/constants/Colors';

import SettingsBlock from '../components/SettingsBlock';

export default function Notifications({ navigation }) {
  const [wantRoomNotifs, setWantRoomNotifs] = useState(false);
  const [wantMessageNotifs, setWantMessageNotifs] = useState(false);

  return (
    <Background style={styles.container} noScroll>
      <SubScreenHeader navigation={navigation} title="Notifications" />
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
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
