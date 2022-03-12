import Background from 'app/components/Background';
import { firebase } from 'app/database/config';
import { setIsConnected } from 'app/store/User';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import BabbleLoader from '../../components/BabbleLoader';
import { Heading, LoginForm, OtherLogs, RegisterForm } from './components';

function Auth({ children }) {
  const [isOnSignIn, setIsOnSignIn] = useState(true);
  const { isConnected } = useSelector(state => state.user);
  const { isLoading } = useSelector(state => state.app);
  const dispatch = useDispatch(state => state.user);

  const setConnected = () => dispatch(setIsConnected(false));

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) setConnected();
    });
  }, []);

  const FormComponent = () => {
    if (isOnSignIn) return <LoginForm />;
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
    if (isLoading) return <BabbleLoader />;
    if (isConnected) return children;
    else
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
  };

  return showUserInterface();
}

export default Auth;
