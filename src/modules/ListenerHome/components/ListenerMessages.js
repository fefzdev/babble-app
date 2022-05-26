import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import UserImage from '@/components/UserImage';

export default function ListenerMessages({
  name,
  profilePicture,
  message,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.messageBloc} onPress={onPress}>
      <UserImage style={styles.thumb} image={profilePicture} />
      <View style={styles.textBloc}>
        <Text style={styles.user}>{name}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  thumb: {
    height: 50,
    width: 50,
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
