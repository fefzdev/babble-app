import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import BabbleButton from '@/components/BabbleButton';
import BabbleInput from '@/components/BabbleInput';
import useRepository from '@/database/Model';
import { setErrorMessage } from '@/store/App';

const auth = getAuth();

function LoginForm() {
  const [password, setPassword] = useState();
  const [mail, setMail] = useState();
  const dispatch = useDispatch();
  const [errorArray, setErrorArray] = useState([]);
  const { userRepository } = useRepository();

  const onLogin = async () => {
    if (mail === null || password === null) {
      dispatch(setErrorMessage(['Remplir tous les champs']));
      onInputError();
      return;
    }
    try {
      await userRepository.connect(auth, mail, password);
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
        placeholder="votre.email@mail.com"
        onChangeText={text => onInput('mail', text)}
        autoComplete="email"
        keyboardType="email-address"
        autoCapitalize="none"
        error={checkError('mail')}
      />
      <BabbleInput
        style={styles.input}
        label="Mot de passe"
        value={password}
        placeholder="**********"
        onChangeText={text => onInput('password', text)}
        autoComplete="password"
        secureTextEntry
        error={checkError('password')}
      />
      <BabbleButton style={styles.button} onPress={() => onLogin()}>
        Se connecter
      </BabbleButton>
    </View>
  );
}

export default LoginForm;
