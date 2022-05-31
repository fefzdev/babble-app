import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';

import useRepository from '@/database/Model';

const auth = getAuth();
export function useRooms() {
  const [allRooms, setAllRooms] = useState<any>([]);

  const { roomRepository } = useRepository();

  const getRoom = async (roomId: string) => {
    return allRooms.find(room => room.id === roomId);
  };

  useEffect(() => {
    roomRepository.listen('', async () => {
      if (!auth?.currentUser.uid) return;
      const rooms = await roomRepository.findUserInRooms(auth.currentUser.uid);
      setAllRooms(rooms);
    });
    return () => {
      console.log('unsubscribe');

      roomRepository.unlisten();
    };
  }, []);

  return {
    allRooms,
    getRoom,
  };
}
