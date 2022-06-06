import { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import Background from '@/components/Background';
import Role from '@/components/RoleBlock';
import colors from '@/constants/Colors';
import font from '@/constants/Fonts';
import useRepository from '@/database/Model';
import { setRooms } from '@/store/Rooms';

import AvailableBlock from './components/AvailableBlock';
import ListenerMessages from './components/ListenerMessages';

function ListenerHome({ navigation }) {
  const { uid } = useSelector(state => state.user);
  const { rooms: roomsStore } = useSelector(state => state.rooms);
  const { members, userRepository, rooms: roomsRepo } = useRepository();
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const filteredRooms = useMemo(() => {
    if (inputValue !== '')
      return roomsStore.filter(({ otherUserData: { name } }) =>
        name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()),
      );

    return roomsStore;
  }, [inputValue, roomsStore]);

  const fetchRooms = async userData => {
    if (!userData?.rooms) return dispatch(setRooms([]));

    const { rooms } = userData;
    const roomsData = await Promise.all(
      Object.keys(rooms).map(async roomUid => {
        const memberList = await members.getRoomMembers(roomUid);
        const otherUser = memberList.filter(m => m !== uid)[0];
        const otherUserData = await userRepository.find(otherUser);
        const roomInfos = await roomsRepo.getRoom(roomUid);

        return { roomUid, otherUserData, ...roomInfos };
      }),
    );
    dispatch(setRooms(roomsData));
  };

  useEffect(() => {
    userRepository.listen(fetchRooms, uid);

    return () => {
      userRepository.unlisten(uid);
    };
  }, []);

  const buildTalkersWantsToTalk = () => {
    if (roomsStore.length === 0)
      return (
        <View style={styles.noTalkers}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require('./assets/listener-waiting.png')}
          />
          <Text style={styles.text}>
            Vous n'avez pas encore de conversations
          </Text>
        </View>
      );
    return filteredRooms.map(room => (
      <ListenerMessages
        key={room.roomUid}
        room={room}
        onPress={() => {
          navigation.navigate('Room', {
            room,
          });
        }}
        onAccept={() => {
          roomsRepo.accept(room.roomUid);
          navigation.navigate('Room', {
            room,
          });
        }}
        onRemove={() => roomsRepo.deleteRoom(room, uid)}
      />
    ));
  };
  buildTalkersWantsToTalk();

  return (
    <Background>
      <Role />
      <AvailableBlock />
      <Text style={styles.convTitle}>Vos conversations</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Rechercher une conversation"
        placeholderTextColor={colors.orange[600]}
      />
      <View style={styles.messageBlock}>{buildTalkersWantsToTalk()}</View>
    </Background>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  convTitle: {
    ...font.title,
    marginTop: 12,
  },

  input: {
    backgroundColor: colors.orange[200],
    borderWidth: 1,
    borderColor: colors.orange[400],
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 8,
    borderRadius: 8,
    fontSize: 16,
    color: colors.orange[900],
  },

  messageBlock: {
    marginTop: 16,
  },

  noTalkers: {
    alignItems: 'center',
  },

  text: {
    maxWidth: 250,
    textAlign: 'center',
    ...font.callout,
  },

  image: {
    height: 250,
  },
});

export default ListenerHome;
