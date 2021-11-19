import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import BabbleButton from '../../components/BabbleButton/BabbleButton';
import BabbleInput from '../../components/BabbleInput';
import Background from '../../components/Background';
import { firebase } from '../../database/config';
import db from '../../database/helper';
import User from '../../database/Model/Users';

import { Heading } from './components';

function Auth({ children }) {
  const [authPassword, setAuthPassword] = useState(null);
  const [authMail, setAuthMail] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isOnSignIn, setIsOnSignIn] = useState(true);
  const UserModel = new User();

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

  const containerStyle = {
    paddingHorizontal: 20,
    marginTop: 42,
  };
  const inputStyle = {
    marginTop: 16,
  };
  const buttonStyle = {
    marginTop: 32,
  };

  const showUserInterface = () => {
    if (isConnected) {
      return children;
    } else {
      return (
        <Background>
          <Heading />

          <View style={containerStyle}>
            <BabbleInput
              style={inputStyle}
              label="Email"
              value={authMail}
              placeholder="your.email@mail.com"
              onChangeText={text => setAuthMail(text)}
            />
            <BabbleInput
              style={inputStyle}
              label="Password"
              value={authPassword}
              placeholder="**********"
              onChangeText={text => setAuthPassword(text)}
            />
            <BabbleButton
              style={buttonStyle}
              onPress={() =>
                UserModel.connect(authMail, authPassword, error =>
                  setErrorMsg(`${error.code}: ${error.message}`),
                )
              }>
              Login
            </BabbleButton>
            <BabbleButton
              style={buttonStyle}
              onPress={() =>
                UserModel.create(authMail, authPassword, error =>
                  setErrorMsg(`${error.code}: ${error.message}`),
                )
              }>
              Sign up
            </BabbleButton>
            <BabbleButton
              style={buttonStyle}
              onPress={() => {
                setIsOnSignIn(!isOnSignIn);
              }}>
              {isOnSignIn ? 'Sign Up' : 'Sign In'}
            </BabbleButton>
            {handleErrors()}
          </View>
        </Background>
      );
    }
  };

  return showUserInterface();
}

export default Auth;
