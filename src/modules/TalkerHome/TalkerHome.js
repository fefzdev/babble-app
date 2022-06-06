import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useRepository from '@/database/Model';
import { setRooms } from '@/store/Rooms';

import TalkerActiveRoom from '../TalkerActiveRoom/TalkerActiveRoom';
import TalkerWaitingForRoom from '../TalkerWaitingForRoom';

export default function TalkerHome({ navigation }) {
  const { userRepository, members, rooms: roomsRepo } = useRepository();
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { rooms } = useSelector(state => state.rooms);

  const fetchRooms = async userData => {
    if (!userData?.rooms) return dispatch(setRooms([]));

    const { rooms: userRooms } = userData;
    const roomsData = await Promise.all(
      Object.keys(userRooms).map(async roomUid => {
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

  if (rooms.find(room => room.isActive))
    return (
      <TalkerActiveRoom
        room={rooms.find(room => room.isActive)}
        navigation={navigation}
      />
    );
  return <TalkerWaitingForRoom navigation={navigation} />;
}
