import { useState } from 'react';
import { StyleSheet, Switch } from 'react-native';

import Background from '@/components/Background';
import SettingsList from '@/components/SettingsList';
import SubScreenHeader from '@/components/SubScreenHeader';
import Colors from '@/constants/Colors';

export default function Notifications({ navigation }) {
  const [wantRoomNotifs, setWantRoomNotifs] = useState(false);
  const [wantMessageNotifs, setWantMessageNotifs] = useState(false);

  const settingsList = [
    {
      icon: 'chat',
      text: 'Nouveaux messages',
      action: () => setWantMessageNotifs(!wantMessageNotifs),
      right: (
        <Switch
          style={styles.switch}
          value={wantMessageNotifs}
          onValueChange={setWantMessageNotifs}
        />
      ),
    },
    {
      icon: 'key',
      text: 'Nouvelles demandes',
      action: () => setWantRoomNotifs(!wantRoomNotifs),
      right: (
        <Switch
          style={styles.switch}
          value={wantRoomNotifs}
          onValueChange={setWantRoomNotifs}
        />
      ),
    },
  ];

  return (
    <Background style={styles.container} noScroll>
      <SubScreenHeader navigation={navigation} title="Notifications" />
      <SettingsList list={settingsList} />
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  SettingItem: {
    marginTop: 16,
    width: '100%',
    backgroundColor: Colors.orange[200],
    borderRadius: 8,
  },
  settingBlock: {
    flex: 0,
  },
});
