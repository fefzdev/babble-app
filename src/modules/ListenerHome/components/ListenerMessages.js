import Icon from '@expo/vector-icons/Entypo';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import UserImage from '@/components/UserImage';
import Colors from '@/constants/Colors';
import useRepository from '@/database/Model';
import { updateRoom } from '@/store/Rooms';

export default function ListenerMessages({
  room,
  onPress,
  onAccept,
  onRemove,
}) {
  const { rooms } = useRepository();
  const { uid } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const fetchRoom = async roomData => {
    dispatch(updateRoom({ uid: room.uid, ...roomData }));
  };

  const lastMessage = () => {
    if (!room.lastMessage)
      return {
        content: 'Un Talker veux parler',
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

  const rightAction = () => {
    if (!room.isAccepted)
      return (
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onRemove()}>
            <View style={[styles.action, styles.remove]}>
              <Icon
                name="cross"
                size={20}
                color={Colors.orange[1000]}
                style={styles.removeText}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onAccept()}>
            <View style={[styles.action, styles.accept]}>
              <Icon
                name="check"
                size={20}
                color={Colors.orange[200]}
                style={styles.acceptText}
              />
            </View>
          </TouchableOpacity>
        </View>
      );
  };

  return (
    <TouchableOpacity
      style={styles.messageBloc}
      onPress={room.isAccepted ? onPress : null}>
      <UserImage
        style={styles.thumb}
        image={room.otherUserData.profilePicture}
      />
      <View style={styles.content}>
        <Text style={styles.message}>{lastMessage().content}</Text>
        <View>
          {room.isAccepted ? (
            <Text style={styles.time}>
              {format(new Date(lastMessage().createdAt), 'HH:mm')}
            </Text>
          ) : null}
        </View>
        {rightAction()}
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
  content: {
    flexDirection: 'row',
    marginLeft: 8,
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
  },
  messageBloc: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  time: {
    fontSize: 12,
  },

  actions: {
    flexDirection: 'row',
  },

  action: {
    padding: 8,
    backgroundColor: Colors.orange[200],
    borderRadius: 32,
  },

  accept: {
    backgroundColor: Colors.orange[1000],
    marginLeft: 16,
  },
});
