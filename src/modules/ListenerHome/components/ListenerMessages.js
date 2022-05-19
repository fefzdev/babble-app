import colors from '@/constants/Colors';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ListenerMessages({ user, message, onPress }) {
  
  return (
    <TouchableOpacity style={styles.messageBloc} onPress={onPress}>
      <View style={styles.thumb} />
      <View style={styles.textBloc}>
        <Text style={styles.user}>{user}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  thumb: {
    height: 50,
    width: 50,
    backgroundColor: colors.black[100],
    borderRadius: 50,
    marginRight: 4,
  },
  user: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
  },
  messageBloc: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  textBloc: {
    padding: 4,
  },
});