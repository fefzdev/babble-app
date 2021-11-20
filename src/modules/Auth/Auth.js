import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import Background from '../../components/Background';
import { firebase } from '../../database/config';
import db from '../../database/helper';

import { Heading, LoginForm, RegisterForm } from './components';

function Auth({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
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

  const handleErrors = () => {
    if (errorMsg) {
      return <Text style={{ color: 'red' }}>{errorMsg}</Text>;
    }
  };

  const FormComponent = () => {
    if (isOnSignIn) {
      return <LoginForm onError={setErrorMsg} />;
    }
    return <RegisterForm onError={setErrorMsg} />;
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
          {handleErrors()}
        </Background>
      );
    }
  };

  return showUserInterface();
}

export default Auth;
