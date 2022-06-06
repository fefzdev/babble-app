import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import Background from '@/components/Background';
import Role from '@/components/RoleBlock';
import useRepository from '@/database/Model';

import AcceptedChatPopup from './components/AcceptedChatPopup';
import AvailableUsers from './components/AvailableUsers';
import WaitingList from './components/WaitingList';

export default function TalkerHome({ navigation }) {
  const {} = useRepository();
  const { rooms } = useSelector(state => state.rooms);
  const [isAcceptedChatPopupDisplayed, setIsPopupDisplayed] = useState(true);

  const acceptedRooms = useMemo(
    () => rooms.filter(room => room.isAccepted),
    [rooms],
  );

  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Accueil' });
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
