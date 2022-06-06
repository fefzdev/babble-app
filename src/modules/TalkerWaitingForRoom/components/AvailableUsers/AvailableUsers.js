import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

import UserImage from '@/components/UserImage';
import Fonts from '@/constants/Fonts';
import useRepository from '@/database/Model';

export default function AvailableUsers() {
  const { userRepository, rooms } = useRepository();
  const [allUsers, setAllUsers] = useState([]);
  const talkerUID = useSelector(state => state.user.uid);
  const createdRooms = useSelector(state => state.rooms.rooms);

  useEffect(() => {
    userRepository.listen(data => {
      setAllUsers(
        Object.entries(data).map(([uid, user]) => ({ uid, ...user })),
      );
    });
    return () => {
      userRepository.unlisten();
    };
  }, []);

  const addToWaitingList = listenerUid => {
    rooms.createRoom(talkerUID, listenerUid, {
      isActive: false,
      isAccepted: false,
      lastMessage: '',
      timestamp: new Date().getTime(),
    });
  };

  const buildUsersAvailable = () => {
    const availableUsers = allUsers
      .filter(user => user.available)
      .filter(
        user => !createdRooms.find(room => room.otherUserData.uid === user.uid),
      );
    if (availableUsers.length)
      return availableUsers.map(user => (
        <TouchableOpacity
          key={user.uid}
          onPress={() => addToWaitingList(user.uid)}>
          <View style={style.item}>
            <UserImage
              style={style.image}
              imageStyle={style.imageRadius}
              image={user.profilePicture}
            />
            <Text numberOfLines={2} ellipsizeMode="tail" style={style.name}>
              {user.name}
            </Text>
          </View>
        </TouchableOpacity>
      ));
    return (
      <Text style={[style.item, style.noMoreUsers]}>
        Pas d'utilisateurs disponibles
      </Text>
    );
  };
  return (
    <View style={style.view}>
      <Text style={[style.title, Fonts.title]}>Utilisateurs disponibles</Text>
      <Text style={[style.subtitle, Fonts.callout]}>
        Choisissez la personne avec qui vous voulez échanger
      </Text>
      <ScrollView style={style.itemContainer} horizontal={true}>
        {buildUsersAvailable()}
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    marginTop: 32,
  },
  title: {},
  subtitle: {
    marginTop: 8,
  },
  itemContainer: {
    marginLeft: -16,
    marginTop: 16,
  },
  item: {
    marginLeft: 16,
    flex: 1,
    width: 64,
    alignItems: 'center',
  },
  noMoreUsers: {
    width: '100%',
  },
  image: {
    width: 48,
    height: 48,
    marginTop: 4,
  },
  imageRadius: {
    borderRadius: 24,
  },
  name: {
    marginTop: 8,
    textAlign: 'center',
  },
});
