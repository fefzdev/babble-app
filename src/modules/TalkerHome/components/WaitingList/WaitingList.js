import fonts from 'app/assets/style/fonts';
import useRepository from 'app/database/Model';
import { removeFromWaitlist } from 'app/store/Rooms';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import WaitingListItem from '../WaitingListItem';

function WaitingList({ navigation }) {
  const { roomRepository } = useRepository();
  const [allRooms, setAllRooms] = useState([]);
  const currentUserUID = useSelector(state => state.user.uid);

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

  const openRoom = roomId => navigation.navigate('Room', { roomId });

  useEffect(() => {
    roomRepository.listen(data => {
      roomRepository.findUserInRooms(currentUserUID, rooms => {
        setAllRooms(rooms);
      });
    });
  }, []);

  const buildUsersAvailable = () => {
    if (!allRooms.length)
      return (
        <Text style={style.itemContainer}>Pas de demandes en attente</Text>
      );

    return (
      <ScrollView style={[style.itemContainer]}>
        {allRooms.map(({ listener, uid, active }) => (
          <WaitingListItem
            key={listener.uid}
            user={listener}
            isRoomActive={active}
            onPress={() => openRoom(uid)}
            onRemove={() => roomRepository.delete(uid)}
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
