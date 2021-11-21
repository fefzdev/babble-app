import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

import Background from '../../components/Background';
import { firebase } from '../../database/config';
import db from '../../database/helper';
import { Heading, LoginForm, OtherLogs, RegisterForm } from './components';

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

  const styles = {
    image: {
      height: 200,
      width: 200,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 32,
    },
  };

  const showUserInterface = () => {
    if (isConnected) {
      return children;
    } else {
      return (
        <Background>
          <Image
            style={styles.image}
            source={require('../../assets/images/welcome.png')}
          />
          <Heading
            isLogin={isOnSignIn}
            onSwitch={() => setIsOnSignIn(!isOnSignIn)}
          />
          {FormComponent()}
          <OtherLogs />
        </Background>
      );
    }
  };

  return showUserInterface();
}

export default Auth;
