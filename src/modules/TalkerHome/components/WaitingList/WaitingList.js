import colors from 'app/assets/style/colors';
import fonts from 'app/assets/style/fonts';
import UserImage from 'app/components/UserImage';
import useRepository from 'app/database/Model';
import { removeFromWaitlist } from 'app/store/Rooms';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

function WaitingList({ navigation }) {
  const { userRepository } = useRepository();
  const [allUsers, setAllUsers] = useState([]);
  const waitlist = useSelector(state => state.rooms.waitlist);
  const dispatch = useDispatch();

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
    },
    userName: {
      fontWeight: 'bold',
      marginBottom: 4,
    },
  });

  const removeFromWaitingList = userId => dispatch(removeFromWaitlist(userId));
  const openRoom = userId => navigation.navigate('Room', { userId });

  useEffect(() => {
    userRepository.listen(data => {
      setAllUsers(data);
    });
  }, []);

  const buildUsersAvailable = () => {
    if (!allUsers.filter(({ uid }) => waitlist.includes(uid)).length)
      return <Text style={style.item}>Pas de demandes en attente</Text>;

    return allUsers
      .filter(({ uid }) => waitlist.includes(uid))
      .map(user => (
        <TouchableOpacity
          onPress={() => openRoom(user.uid)}
          key={user.uid + '-waiting'}>
          <View style={style.item}>
            <UserImage
              style={style.image}
              imageStyle={style.imageRadius}
              image={user.image}
            />
            <View style={style.infos}>
              <Text
                key={user.uid}
                onPress={() => console.log(user.uid)}
                style={style.userName}>
                {user.name}
              </Text>
              <Text>Demande envoyée...</Text>
            </View>
          </View>
        </TouchableOpacity>
      ));
  };
  return (
    <View style={style.view}>
      <Text style={[style.title, fonts.title]}>Demandes en attente</Text>
      <Text style={[style.subtitle, fonts.callout]}>
        Nous vous previendrons dès qu’un Listener aura accepté votre demande
      </Text>
      {buildUsersAvailable()}
    </View>
  );
}

export default WaitingList;
