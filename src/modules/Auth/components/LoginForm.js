import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import BabbleButton from '@/components/BabbleButton';
import BabbleInput from '@/components/BabbleInput';
import { setErrorMessage } from '@/store/App';

const auth = getAuth();

function LoginForm() {
  const [password, setPassword] = useState('199100');
  const [mail, setMail] = useState('test2@test.fr');
  const dispatch = useDispatch();
  const [errorArray, setErrorArray] = useState([]);

  const onLogin = async () => {
    if (mail === null || password === null) {
      dispatch(setErrorMessage(['Please fill in all fields']));
      onInputError();
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, mail, password);
    } catch (error) {
      dispatch(setErrorMessage(`${error.code}: ${error.message}`));
    }
  };

  const onInputError = () => {
    setErrorArray([]);

    if (mail === null) {
      setErrorArray(oldArray => [...oldArray, 'mail']);
    }
    if (password === null) {
      setErrorArray(oldArray => [...oldArray, 'password']);
    }
  };

  const checkError = inputName => {
    return errorArray.includes(inputName);
  };

  const onInput = (inputName, inputValue) => {
    setErrorArray([]);

    switch (inputName) {
      case 'mail':
        setMail(inputValue);
        break;
      case 'password':
        setPassword(inputValue);
        break;
      default:
        break;
    }
  };

  const styles = {
    container: {
      marginTop: 42,
      marginBottom: 24,
    },
    input: {
      marginTop: 16,
    },
    button: {
      marginTop: 32,
    },
  };

  return (
    <View style={styles.container}>
      <BabbleInput
        style={styles.input}
        label="Email"
        value={mail}
        placeholder="your.email@mail.com"
        onChangeText={text => onInput('mail', text)}
        autoComplete="email"
        keyboardType="email-address"
        autoCapitalize="none"
        error={checkError('mail')}
      />
      <BabbleInput
        style={styles.input}
        label="Password"
        value={password}
        placeholder="**********"
        onChangeText={text => onInput('password', text)}
        autoComplete="password"
        secureTextEntry
        error={checkError('password')}
      />
      <BabbleButton style={styles.button} onPress={() => onLogin()}>
        Login
      </BabbleButton>
    </View>
  );
}

export default LoginForm;
