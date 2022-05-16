import { useState } from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';

import BabbleLoader from '@/components/BabbleLoader';
import Background from '@/components/Background';

import { Heading, LoginForm, OtherLogs, RegisterForm } from './components';

function Auth({}) {
  const [isOnSignIn, setIsOnSignIn] = useState(true);
  const { isLoading } = useSelector(state => state.app);

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
