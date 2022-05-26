import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import UserImage from '@/components/UserImage';
import Fonts from '@/constants/Fonts';
import useRepository from '@/database/Model';
import { addToWaitlist } from '@/store/Rooms';

export default function AvailableUsers() {
  const { userRepository, roomRepository } = useRepository();
  const [allUsers, setAllUsers] = useState([]);
  const currentUserUID = useSelector(state => state.user.uid);
  const waitlist = useSelector(state => state.rooms.waitlist);
  const dispatch = useDispatch();

  useEffect(() => {
    userRepository.listen(data => {
      setAllUsers(data);
    });
  }, []);

  const addToWaitingList = userId => {
    dispatch(addToWaitlist(userId));
    roomRepository.create({
      talkerUid: currentUserUID,
      listenerUid: userId,
    });
  };

  const buildUsersAvailable = () => {
    const availableUsers = allUsers.filter(user => user.available);
    if (availableUsers.length)
      return availableUsers.map(user => (
        <TouchableOpacity
          onPress={() => addToWaitingList(user.uid)}
          key={user.uid}>
          <View
            opacity={waitlist.includes(user.uid) ? 0.5 : 1}
            style={style.item}>
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
    return <Text style={style.item}>Pas d'utilisateurs disponibles</Text>;
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
    height: 80,
    marginLeft: -16,
    marginTop: 16,
  },
  item: {
    marginLeft: 16,
    flex: 1,
    width: 64,
    alignItems: 'center',
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
