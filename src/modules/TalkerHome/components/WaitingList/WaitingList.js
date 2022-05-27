import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import Fonts from '@/constants/Fonts';
import useRepository from '@/database/Model';

import WaitingListItem from '../WaitingListItem';

export default function WaitingList({ navigation }) {
  const { roomRepository } = useRepository();
  const [allRooms, setAllRooms] = useState([]);
  const currentUserUID = useSelector(state => state.user.uid);

  const openRoom = roomId => navigation.navigate('Room', { roomId });

  useEffect(() => {
    roomRepository.listen(async () => {
      const rooms = await roomRepository.findUserInRooms(currentUserUID);
      setAllRooms(rooms);

      return () => {
        roomRepository.unlisten();
      };
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
      <Text style={[style.title, Fonts.title]}>Demandes en attente</Text>
      <Text style={[style.subtitle, Fonts.callout]}>
        Nous vous previendrons dès qu’un Listener aura accepté votre demande
      </Text>
      {buildUsersAvailable()}
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
