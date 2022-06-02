import Icon from '@expo/vector-icons/Entypo';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/Colors';

export default function BabbleButton({
  style,
  icon = 'info',
  color = 'orange',
  content,
}) {
  return (
    <View
      style={[styles.infoBox, { backgroundColor: Colors[color][200] }, style]}>
      <Icon
        style={styles.icon}
        name={icon}
        size={16}
        color={Colors[color][1000]}
      />
      <Text style={[styles.infoBoxText, { color: Colors[color][1000] }]}>
        {content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  icon: {
    marginRight: 16,
  },
  infoBoxText: {
    flexShrink: 1,
    color: Colors.orange[1000],
  },
});
