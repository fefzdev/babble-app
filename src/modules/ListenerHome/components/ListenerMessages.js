import { format } from 'date-fns';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import UserImage from '@/components/UserImage';
import useRepository from '@/database/Model';
import { updateRoom } from '@/store/Rooms';

export default function ListenerMessages({ room, onPress }) {
  const { rooms } = useRepository();
  const dispatch = useDispatch();

  const fetchRoom = async roomData => {
    dispatch(updateRoom({ uid: room.uid, ...roomData }));
  };

  useEffect(() => {
    rooms.listen(fetchRoom, room.uid);

    return rooms.unlisten();
  }, []);

  return (
    <TouchableOpacity style={styles.messageBloc} onPress={onPress}>
      <UserImage
        style={styles.thumb}
        image={room.otherUserData.profilePicture}
      />
      <View style={styles.textBloc}>
        <Text style={styles.user}>{room.otherUserData.name}</Text>
        <Text style={styles.message}>{room.lastMessage.content}</Text>
      </View>
      <View>
        <Text style={styles.time}>
          {format(new Date(room.lastMessage.createdAt), 'HH:mm')}
        </Text>
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
    flexGrow: 1,
  },
  time: {
    fontSize: 12,
  },
});
