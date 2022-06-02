import Icon from '@expo/vector-icons/Entypo';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '@/constants/Colors';

export default function SettingsBlock({ style, text, icon, onPress, right }) {
  return (
    <TouchableOpacity
      style={[styles.settingItem, style]}
      onPress={typeof text !== 'object' ? onPress : null}>
      <Icon
        style={styles.icon}
        name={icon}
        size={24}
        color={Colors.orange[1000]}
      />
      <View style={styles.content}>
        <Text style={styles.text}>{text}</Text>
        {right ? (
          right
        ) : (
          <Icon name="chevron-right" size={24} color={Colors.orange[1000]} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
  },
  icon: {
    marginRight: 16,
  },
  text: {
    fontSize: 18,
    color: Colors.orange[900],
  },
  content: {
    paddingVertical: 12,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.orange[100],
    backgroundColor: 'transparent',
  },
});
