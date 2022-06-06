import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import BabbleLoader from '@/components/BabbleLoader';
import useRepository from '@/database/Model';
import Room from '@/modules/Room';
import { setIsTalkerActiveRoom } from '@/store/App';

export default function TalkerActiveRoom({ navigation, room }) {
  const dispatch = useDispatch();
  const { messages } = useRepository();

  const [isLoading, setIsLoading] = useState(true);
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    dispatch(setIsTalkerActiveRoom(true));

    messages.listen(messagesObject => {
      if (messagesObject) setRoomMessages(Object.values(messagesObject));
    }, room.uid);

    navigation.setOptions({ headerTitle: room.otherUserData.name });
    setIsLoading(false);

    return () => {
      messages.unlisten();
      dispatch(setIsTalkerActiveRoom(false));
    };
  }, []);

  if (isLoading) return <BabbleLoader />;
  return <Room room={room} messages={roomMessages} />;
}
