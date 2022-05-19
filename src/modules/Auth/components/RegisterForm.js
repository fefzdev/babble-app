import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import BabbleButton from '@/components/BabbleButton';
import BabbleInput from '@/components/BabbleInput';
import useRepository from '@/database/Model';
import { setErrorMessage } from '@/store/App';

const auth = getAuth();

export default function RegisterForm() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [mail, setMail] = useState(null);
  const [errorArray, setErrorArray] = useState([]);
  const { userRepository } = useRepository();

  const dispatch = useDispatch();

  const onRegister = async () => {
    if (
      username === null ||
      password === null ||
      passwordConfirm === null ||
      mail === null
    ) {
      dispatch(setErrorMessage('Please fill all fields'));
      onInputError();
      return;
    }
    if (password !== passwordConfirm) {
      dispatch(setErrorMessage('Passwords do not match'));
      onInputError();
      return;
    }
    try {
      await userRepository.create(auth, mail, password);
    } catch (error) {
      dispatch(setErrorMessage(`${error.code}: ${error.message}`));
    }
  };

  const onInputError = () => {
    setErrorArray([]);

    if (username === null) {
      setErrorArray(oldArray => [...oldArray, 'username']);
    }
    if (password === null || password !== passwordConfirm) {
      setErrorArray(oldArray => [...oldArray, 'password']);
    }
    if (passwordConfirm === null || password !== passwordConfirm) {
      setErrorArray(oldArray => [...oldArray, 'passwordConfirm']);
    }
    if (mail === null) {
      setErrorArray(oldArray => [...oldArray, 'mail']);
    }
  };

  const onInput = (type, value) => {
    setErrorArray([]);

    switch (type) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'passwordConfirm':
        setPasswordConfirm(value);
        break;
      case 'mail':
        setMail(value);
        break;
      default:
        break;
    }
  };

  const checkError = inputName => errorArray.includes(inputName);

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
        label="Username"
        value={username}
        placeholder="beubeuOfThe33"
        onChangeText={text => onInput('username', text)}
        error={checkError('username')}
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
      <BabbleInput
        style={styles.input}
        label="Confirm password"
        value={passwordConfirm}
        placeholder="**********"
        onChangeText={text => onInput('passwordConfirm', text)}
        secureTextEntry
        error={checkError('passwordConfirm')}
      />
      <BabbleButton style={styles.button} onPress={() => onRegister()}>
        Sign up
      </BabbleButton>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
