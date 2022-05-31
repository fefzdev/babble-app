import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import UserImage from '@/components/UserImage';
import Colors from '@/constants/Colors';
import useRepository from '@/database/Model';
import { updateRoom } from '@/store/Rooms';

export default function WaitingListItem({ room, onPress, onRemove }) {
  const { rooms } = useRepository();
  const dispatch = useDispatch();

  const fetchRoom = async roomData => {
    dispatch(updateRoom({ uid: room.uid, ...roomData }));
  };

  useEffect(() => {
    rooms.listen(fetchRoom, room.uid);

    return rooms.unlisten();
  }, []);

  const info = () => {
    if (room.isActive) return <Text>Demande acceptée !</Text>;
    return <Text>Demande envoyée...</Text>;
  };

  const rightAction = () => {
    if (room.isActive)
      return (
        <TouchableOpacity onPress={() => onPress()}>
          <View style={style.remove}>
            <Text style={style.removeText}>Discuter</Text>
          </View>
        </TouchableOpacity>
      );
    return (
      <TouchableOpacity onPress={() => onRemove()}>
        <View style={style.remove}>
          <Text style={style.removeText}>Annuler</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (!room) return null;

  return (
    <View key={room.otherUserData.uid + '-waiting'} style={style.item}>
      <UserImage
        style={style.image}
        imageStyle={style.imageRadius}
        image={room.otherUserData.profilePicture}
      />
      <View style={style.infos}>
        <Text key={room.otherUserData.uid} style={style.userName}>
          {room.otherUserData.name}
        </Text>
        {info()}
      </View>
      {rightAction()}
    </View>
  );
}

const style = StyleSheet.create({
  item: {
    marginTop: 16,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 48,
    height: 48,
    marginTop: 4,
  },
  imageRadius: {
    borderRadius: 24,
  },
  infos: {
    marginLeft: 8,
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  remove: {
    padding: 8,
    backgroundColor: Colors.orange[200],
    borderRadius: 8,
  },
  removeText: {
    color: Colors.orange[1000],
  },
});
