import React, { useEffect, useState } from 'react';

import Background from '../../components/Background';
import { firebase } from '../../database/config';
import db from '../../database/helper';
import { Heading, LoginForm, RegisterForm } from './components';

function Auth({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isOnSignIn, setIsOnSignIn] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsConnected(true);
        db.readChild('users', user.uid).then(snap => {
          if (snap) {
            console.log(snap.val());
          }
        });
      } else {
        setIsConnected(false);
      }
    });
  }, []);

  const FormComponent = () => {
    if (isOnSignIn) {
      return <LoginForm />;
    }
    return <RegisterForm />;
  };

  const showUserInterface = () => {
    if (isConnected) {
      return children;
    } else {
      return (
        <Background>
          <Heading
            isLogin={isOnSignIn}
            onSwitch={() => setIsOnSignIn(!isOnSignIn)}
          />
          {FormComponent()}
        </Background>
      );
    }
  };

  return showUserInterface();
}

export default Auth;
