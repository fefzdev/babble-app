import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {globalStyle, globalVariable} from '../../assets/style/style';
import Background from '../Background';
import {firebase} from '../../database/config';

function Auth({children}) {
  const [authPassword, setAuthPassword] = useState(null);
  const [authMail, setAuthMail] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsConnected(true);

        firebase
          .database()
          .ref('users')
          .child(user.uid)
          .get()
          .then(snap => {
            console.log(snap.val());
          });
      } else {
        setIsConnected(false);
      }
    });
  }, []);

  const tryConnection = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(authMail, authPassword)
      .then(userCredential => {
        console.log(userCredential);
      })
      .catch(error => {
        setErrorMsg(`${error.code}, ${error.message}`);
      });
  };

  const handleErrors = () => {
    if (errorMsg) {
      return <Text style={{color: 'red'}}>{errorMsg}</Text>;
    }
  };

  const showUserInterface = () => {
    if (isConnected) {
      return children;
    } else {
      return (
        <Background>
          <View
            style={{
              paddingVertical: 50,
              paddingHorizontal: 20,
            }}>
            <Text>Rentrez votre mail</Text>
            <TextInput
              style={globalStyle.input}
              value={authMail}
              onChangeText={text => setAuthMail(text)}
            />
            <Text>Rentrez votre MDP</Text>
            <TextInput
              style={globalStyle.input}
              value={authPassword}
              onChangeText={text => setAuthPassword(text)}
            />
            <Button
              style={globalStyle.button}
              title="Send"
              color={globalVariable.secondColor}
              onPress={() => tryConnection()}
            />
            {handleErrors()}
          </View>
        </Background>
      );
    }
  };

  return showUserInterface();
}

export default Auth;
