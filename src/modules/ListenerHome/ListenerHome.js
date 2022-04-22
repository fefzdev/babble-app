import colors from 'app/assets/style/colors';
import font from 'app/assets/style/fonts';
import Background from 'app/components/Background';
import Role from 'app/components/RoleBlock';
import useRepository from 'app/database/Model';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

function ListenerHome({ navigation }) {
  const { uid, available } = useSelector(state => state.user);
  const { userRepository } = useRepository();
  const [isEnabled, setIsEnabled] = useState(available);

  const styles = StyleSheet.create({
    loader: {
      flex: 1,
      width: '100%',
      height: '100%',
    },

    availableBloc: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 33,
    },

    convTitle: {
      ...font.title,
      marginTop: 33,
    },
  });

  useEffect(() => {
    userRepository.updateData(uid, { available: isEnabled });
  }, [isEnabled]);

  const toggleSwitch = e => {
    setIsEnabled(!isEnabled);
  };

  return (
    <Background style={styles.background}>
      <Role />
      <View style={styles.availableBloc}>
        <Text style={font.callout}>Êtes-vous disponible ?</Text>
        <Switch
          trackColor={{ false: colors.orange[50], true: colors.orange[400] }}
          thumbColor={colors.orange[1000]}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Text style={styles.convTitle}>Vos conversations</Text>
    </Background>
  );
}

export default ListenerHome;
