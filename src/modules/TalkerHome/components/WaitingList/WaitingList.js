import fonts from 'app/assets/style/fonts';
import useRepository from 'app/database/Model';
import { removeFromWaitlist } from 'app/store/Rooms';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import WaitingListItem from '../WaitingListItem';

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
      height: '100%',
      marginTop: 8,
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
    const userWaitlist = allUsers.filter(({ uid }) => waitlist.includes(uid));

    if (!userWaitlist.length)
      return (
        <Text style={style.itemContainer}>Pas de demandes en attente</Text>
      );

    return (
      <ScrollView style={[style.itemContainer]}>
        {userWaitlist.map(user => (
          <WaitingListItem
            key={user.uid}
            user={user}
            onPress={() => openRoom(user.uid)}
            onRemove={() => removeFromWaitingList(user.uid)}
          />
        ))}
      </ScrollView>
    );
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
