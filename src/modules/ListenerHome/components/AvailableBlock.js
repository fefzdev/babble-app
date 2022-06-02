import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import useRepository from '@/database/Model';

export default function AvailableBlock({}) {
  const { available, uid } = useSelector(state => state.user);
  const [isEnabled, setIsEnabled] = useState(available);

  const { userRepository } = useRepository();

  const updateUserAvailable = async e => {
    await userRepository.updateData(uid, { available: e });
  };

  const toggleSwitch = e => {
    setIsEnabled(e);
    updateUserAvailable(e);
  };

  return (
    <View style={styles.availableBlock}>
      <Text style={Fonts.callout}>Êtes-vous disponible ?</Text>
      <Text style={Fonts.callout}> {available}</Text>
      <Switch
        trackColor={{ false: Colors.orange[50], true: Colors.orange[400] }}
        thumbColor={Colors.orange[1000]}
        ios_backgroundColor={Colors.orange[50]}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  availableBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
  },
});
