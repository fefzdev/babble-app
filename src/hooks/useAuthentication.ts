import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import React from 'react';

import useRepository from '@/database/Model';

const auth = getAuth();

export function useAuthentication() {
  const [userState, setUser] = React.useState<User>();
  const { userRepository } = useRepository();

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(
      auth,
      async user => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          await userRepository.syncStore(user.uid);
          setUser(user);
        } else {
          // User is signed out
          setUser(undefined);
        }
      },
    );

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user: userState,
  };
}
