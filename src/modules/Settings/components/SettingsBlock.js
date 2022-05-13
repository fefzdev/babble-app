import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from '../../../assets/style/colors';
import fonts from '../../../assets/style/fonts';

export default function SettingsBlock({ text, title, onPress }) {
  const styles = StyleSheet.create({
    settingBlock: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderBottomWidth: 2,
      borderBottomColor: colors.orange[100],
    },
    settingTitle: {
      ...fonts.smTitle,
      marginRight: 4,
    },
    text: {
      ...fonts.smText,
      color: colors.orange[900],
      fontWeight: 'bold',
    },
  });

  return (
    <TouchableOpacity style={styles.settingBlock} onPress={onPress}>
      <Text style={styles.settingTitle}>{title} : </Text>
      {typeof text === 'object' ? (
        text
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}
