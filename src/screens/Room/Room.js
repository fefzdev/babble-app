import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

import BabbleLoader from '@/components/BabbleLoader';
import useRepository from '@/database/Model';
import RoomModule from '@/modules/Room';
import { UserRoles } from '@/types/UserRoles.enums';

export default function Room({ navigation, route }) {
  const room = route.params.room;

  const { messages } = useRepository();
  const { type } = useSelector(state => state.user);
  const { rooms } = useSelector(state => state.rooms);

  const [isLoading, setIsLoading] = useState(true);
  const [roomMessages, setRoomMessages] = useState([]);

  const fetchRoom = () => {
    if (type === UserRoles.LISTENER)
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

  const deletedRoomAlert = () => {
    Alert.alert(
      'Conversation supprimée',
      "La conversation a été supprimée par l'un des participants",
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  useEffect(() => {
    if (!rooms.find(r => r.roomUid === room.uid)) return deletedRoomAlert();
  }, [rooms]);

  if (isLoading) return <BabbleLoader />;

  return (
    <RoomModule navigation={navigation} room={room} messages={roomMessages} />
  );
}
