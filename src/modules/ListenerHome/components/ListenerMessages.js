import { format } from 'date-fns';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import UserImage from '@/components/UserImage';
import useRepository from '@/database/Model';
import { updateRoom } from '@/store/Rooms';

export default function ListenerMessages({ room, onPress }) {
  const { rooms } = useRepository();
  const { uid } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const fetchRoom = async roomData => {
    dispatch(updateRoom({ uid: room.uid, ...roomData }));
  };

  const lastMessage = () => {
    if (!room.lastMessage)
      return {
        content: 'La room à été créée',
        createdAt: room.timestamp,
      };
    return {
      createdAt: room.lastMessage.createdAt,
      content:
        room.lastMessage.userUid === uid
          ? `Vous: ${room.lastMessage.content}`
          : room.lastMessage.content,
    };
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
      <View style={styles.content}>
        <View style={styles.textBloc}>
          <Text style={styles.user}>{room.otherUserData.name}</Text>
          <Text style={styles.message}>{lastMessage().content}</Text>
        </View>
        <View>
          <Text style={styles.time}>
            {format(new Date(lastMessage().createdAt), 'HH:mm')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  thumb: {
    height: 50,
    width: 50,
    borderRadius: 50,
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
  content: {
    flexDirection: 'row',
    marginLeft: 8,
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 4,
  },
  time: {
    fontSize: 12,
  },
});
