import BabbleLoader from 'app/components/BabbleLoader';
import { UserRoles } from 'app/constants/Roles';
import useRepository from 'app/database/Model';
import RoomModule from 'app/modules/Room';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Room({ route, navigation }) {
  const { userRepository, roomRepository } = useRepository();
  const currentUser = useSelector(state => state.user);
  const roomUid = route.params.roomId;

  const [isLoading, setIsLoading] = useState(true);
  const [roomMessages, setRoomMessages] = useState([]);
  const [listener, setListener] = useState(null);

  useEffect(() => {
    roomRepository.listenForKey('messages', roomUid, messages => {
      if (messages) setRoomMessages(messages);
    });

    roomRepository.find(roomUid, currentRoom => {
      userRepository.find(currentRoom.users[1], roomListener => {
        setListener(roomListener);

        if (currentUser.type === UserRoles.LISTENER)
          navigation.setOptions({ headerTitle: 'Votre talker' });
        else navigation.setOptions({ headerTitle: roomListener.name });
        setIsLoading(false);
      });
    });
  }, []);
  if (isLoading) return <BabbleLoader />;

  return (
    <RoomModule roomUid={roomUid} listener={listener} messages={roomMessages} />
  );
}
