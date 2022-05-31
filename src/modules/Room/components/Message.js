import { format } from 'date-fns';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '@/constants/Colors';

export default function Message({ message: { userUid, content, createdAt } }) {
  const currentUser = useSelector(state => state.user);

  const isOwn = () => currentUser.uid === userUid;

  return (
    <View style={[styles.container, isOwn() ? styles.isOwn : null]}>
      <View style={[styles.message, isOwn() ? styles.ownMessage : null]}>
        <Text>{content}</Text>
        <Text style={styles.time}>
          {createdAt ? format(new Date(createdAt), 'HH:mm') : null}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    marginTop: 16,
  },
  isOwn: {
    justifyContent: 'flex-end',
  },
  message: {
    backgroundColor: Colors.orange[100],
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    maxWidth: '80%',
  },
  ownMessage: {
    backgroundColor: Colors.orange[300],
  },
  name: {
    color: Colors.orange[1000],
    fontWeight: 'bold',
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    color: Colors.orange[1000],
    width: '100%',
    textAlign: 'right',
    marginTop: 4,
  },
});
