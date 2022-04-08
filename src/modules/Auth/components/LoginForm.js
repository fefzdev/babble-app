import BabbleButton from 'app/components/BabbleButton/BabbleButton';
import BabbleInput from 'app/components/BabbleInput';
import User from 'app/database/Model/Users';
import { setErrorMessage } from 'app/store/App';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

function LoginForm() {
  const [password, setPassword] = useState('testtest1234');
  const [mail, setMail] = useState('test@test.test');
  const UserModel = new User();
  const dispatch = useDispatch();
  const [errorArray, setErrorArray] = useState([]);

  const onLogin = () => {
    if (mail === null || password === null) {
      dispatch(setErrorMessage(['Please fill in all fields']));
      onInputError();
      return;
    }
    UserModel.connect(mail, password, error =>
      dispatch(setErrorMessage(`${error.code}: ${error.message}`)),
    );
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
