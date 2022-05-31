import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import Fonts from '@/constants/Fonts';
import useRepository from '@/database/Model';

import WaitingListItem from '../WaitingListItem';

export default function WaitingList({ navigation }) {
  const { rooms: roomRepo } = useRepository();
  const { rooms } = useSelector(state => state.rooms);
  const { uid } = useSelector(state => state.user);

  const openRoom = room => navigation.navigate('Room', { room });

  const buildUsersAvailable = () => {
    if (!rooms.length)
      return (
        <Text style={style.itemContainer}>Pas de demandes en attente</Text>
      );
    return (
      <ScrollView style={[style.itemContainer]}>
        {rooms.map(room => (
          <WaitingListItem
            key={room.roomUid}
            room={room}
            onPress={() => openRoom(room)}
            onRemove={() => roomRepo.deleteRoom(room, uid)}
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
