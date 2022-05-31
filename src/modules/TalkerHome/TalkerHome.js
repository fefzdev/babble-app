import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Background from '@/components/Background';
import Role from '@/components/RoleBlock';
import useRepository from '@/database/Model';
import { setRooms } from '@/store/Rooms';

import AvailableUsers from './components/AvailableUsers';
import WaitingList from './components/WaitingList';

export default function TalkerHome({ navigation }) {
  const { userRepository, members, rooms: roomsRepo } = useRepository();
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  const fetchRooms = async userData => {
    if (!userData?.rooms) return dispatch(setRooms([]));

    const { rooms } = userData;
    const roomsData = await Promise.all(
      Object.keys(rooms).map(async roomUid => {
        const memberList = await members.getRoomMembers(roomUid);
        const otherUser = memberList.filter(m => m !== currentUser.uid)[0];
        const otherUserData = await userRepository.find(otherUser);
        const roomInfos = await roomsRepo.getRoom(roomUid);

        return { roomUid, otherUserData, ...roomInfos };
      }),
    );
    dispatch(setRooms(roomsData));
  };

  useEffect(() => {
    userRepository.listen(fetchRooms, currentUser.uid);

    return () => {
      userRepository.unlisten();
    };
  }, []);

  return (
    <Background style={styles.background}>
      <Role />
      <View>
        <AvailableUsers />
        <WaitingList navigation={navigation} />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
