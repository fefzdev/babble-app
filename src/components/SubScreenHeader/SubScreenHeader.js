import Icon from '@expo/vector-icons/Entypo';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

export default function SubScreenHeader({ navigation, title }) {
  return (
    <View style={styles.head}>
      <TouchableOpacity
        style={styles.action}
        onPress={() => navigation.goBack()}>
        <Icon size={24} color={Colors.orange[1000]} name="chevron-left" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 4,
    backgroundColor: 'transparent',
    marginBottom: 16,
    marginTop: 44,
  },
  action: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.orange[200],
  },
  title: {
    position: 'absolute',
    left: '50%',
    width: 200,
    transform: [{ translateX: -100 }],
    ...Fonts.title,
    textAlign: 'center',
  },
});
