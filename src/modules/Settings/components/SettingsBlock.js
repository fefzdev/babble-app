import Icon from '@expo/vector-icons/Entypo';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { View } from '@/components/Themed';
import Colors from '@/constants/Colors';

export default function SettingsBlock({ text, icon, onPress }) {
  const styles = StyleSheet.create({
    settingItem: {
      flex: 1,
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
      flexGrow: 1,
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: Colors.orange[100],
      backgroundColor: 'transparent',
    },
  });

  return (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={typeof text !== 'object' ? onPress : null}>
      <Icon
        style={styles.icon}
        name={icon}
        size={24}
        color={Colors.orange[1000]}
      />
      <View style={styles.content}>
        {typeof text === 'object' ? (
          text
        ) : (
          <>
            <Text style={styles.text}>{text}</Text>
            <Icon name="chevron-right" size={24} color={Colors.orange[1000]} />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}
