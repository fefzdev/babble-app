import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Background from '@/components/Background';
import Role from '@/components/RoleBlock';
import useRepository from '@/database/Model';
import { setRooms } from '@/store/Rooms';

import AcceptedChatPopup from './components/AcceptedChatPopup';
import AvailableUsers from './components/AvailableUsers';
import WaitingList from './components/WaitingList';

export default function TalkerHome({ navigation }) {
  const { userRepository, members, rooms: roomsRepo } = useRepository();
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { rooms } = useSelector(state => state.rooms);
  const [isAcceptedChatPopupDisplayed, setIsPopupDisplayed] = useState(true);

  const acceptedRooms = useMemo(
    () => rooms.filter(room => room.isAccepted),
    [rooms],
  );

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

  return (
    <Background>
      <Role />
      <AvailableUsers />
      <WaitingList
        navigation={navigation}
        onSeeAccepted={() => setIsPopupDisplayed(true)}
        isChatActivable={acceptedRooms.length > 0}
      />
      <AcceptedChatPopup
        navigation={navigation}
        isVisible={acceptedRooms.length > 0 && isAcceptedChatPopupDisplayed}
        onClose={() => setIsPopupDisplayed(false)}
        rooms={acceptedRooms}
      />
    </Background>
  );
}
