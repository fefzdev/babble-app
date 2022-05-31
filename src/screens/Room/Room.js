import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import BabbleLoader from '@/components/BabbleLoader';
import useRepository from '@/database/Model';
import RoomModule from '@/modules/Room';
import { UserRoles } from '@/types/UserRoles.enums';

export default function Room({ navigation, route }) {
  const room = route.params.room;

  const { messages } = useRepository();
  const currentUser = useSelector(state => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const [roomMessages, setRoomMessages] = useState([]);

  const fetchRoom = async () => {
    if (currentUser.type === UserRoles.LISTENER)
      navigation.setOptions({ headerTitle: 'Votre talker' });
    else navigation.setOptions({ headerTitle: room.otherUserData.name });
    setIsLoading(false);
  };

  useEffect(() => {
    messages.listen(messagesObject => {
      if (messagesObject) setRoomMessages(Object.values(messagesObject));
    }, room.uid);

    fetchRoom();

    return () => {
      messages.unlisten();
    };
  }, []);

  if (isLoading) return <BabbleLoader />;

  return <RoomModule room={room} messages={roomMessages} />;
}
