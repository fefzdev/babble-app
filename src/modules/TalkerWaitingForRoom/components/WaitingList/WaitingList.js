import Icon from '@expo/vector-icons/Entypo';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import useRepository from '@/database/Model';

import WaitingListItem from '../WaitingListItem';

export default function WaitingList({
  navigation,
  onSeeAccepted,
  isChatActivable,
}) {
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
      <View style={[style.itemContainer]}>
        {rooms.map(room => (
          <WaitingListItem
            key={room.roomUid}
            room={room}
            onPress={() => openRoom(room)}
            onRemove={() => roomRepo.deleteRoom(room, uid)}
          />
        ))}
      </View>
    );
  };

  const openAcceptedModalButton = () => {
    if (isChatActivable)
      return (
        <TouchableOpacity style={style.seeAccepted} onPress={onSeeAccepted}>
          <Icon
            style={style.icon}
            name="heart"
            size={16}
            color={Colors.orange[1000]}
          />
          <Text style={style.seeAcceptedText}>Voir vos demandes acceptées</Text>
        </TouchableOpacity>
      );
    return null;
  };

  return (
    <View style={style.view}>
      <Text style={[style.title, Fonts.title]}>Demandes en attente</Text>
      <Text style={[style.subtitle, Fonts.callout]}>
        Nous vous previendrons dès qu’un Listener aura accepté votre demande
      </Text>
      {openAcceptedModalButton()}
      {buildUsersAvailable()}
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    marginTop: 32,
    paddingBottom: 80,
  },
  title: {},
  subtitle: {
    marginTop: 8,
  },
  itemContainer: {
    marginTop: 8,
  },
  item: {
    marginTop: 16,
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
  seeAccepted: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: Colors.orange[200],
    borderRadius: 8,
    marginTop: 8,
  },
  seeAcceptedText: {
    color: Colors.orange[1000],
    fontWeight: 'bold',
  },
  emailVerifiedText: {
    color: Colors.orange[1000],
  },
  icon: {
    marginRight: 4,
  },
});
