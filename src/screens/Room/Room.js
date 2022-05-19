import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import BabbleLoader from '@/components/BabbleLoader';
import useRepository from '@/database/Model';
import RoomModule from '@/modules/Room';
import { UserRoles } from '@/types/UserRoles.enums';

export default function Room({ route, navigation }) {
  const { userRepository, roomRepository } = useRepository();
  const currentUser = useSelector(state => state.user);
  const roomUid = route.params.roomId;

  const [isLoading, setIsLoading] = useState(true);
  const [roomMessages, setRoomMessages] = useState([]);
  const [listener, setListener] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      roomRepository.listenForKey('messages', roomUid, messages => {
        if (messages) setRoomMessages(messages);
      });

      const currentRoom = await roomRepository.find(roomUid);
      const roomListener = await userRepository.find(currentRoom.users[1]);
      setListener(roomListener);

      if (currentUser.type === UserRoles.LISTENER)
        navigation.setOptions({ headerTitle: 'Votre talker' });
      else navigation.setOptions({ headerTitle: roomListener.name });

      setIsLoading(false);
    };
    fetchRoom();
  }, []);

  if (isLoading) return <BabbleLoader />;

  return (
    <RoomModule roomUid={roomUid} listener={listener} messages={roomMessages} />
  );
}
