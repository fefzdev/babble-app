import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import BabbleButton from '../../../components/BabbleButton/BabbleButton';
import BabbleInput from '../../../components/BabbleInput';
import User from '../../../database/Model/Users';
import { setErrorMessage } from '../../../store/App';

function RegisterForm({ onError }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [mail, setMail] = useState(null);
  const UserModel = new User();
  const dispatch = useDispatch();

  const onRegister = async () => {
    await UserModel.create(mail, password, username, error =>
      dispatch(setErrorMessage(`${error.code}: ${error.message}`)),
    );
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

  return (
    <View style={containerStyle}>
      <BabbleInput
        style={inputStyle}
        label="Email"
        value={mail}
        placeholder="your.email@mail.com"
        onChangeText={text => setMail(text)}
        autoComplete="email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <BabbleInput
        style={inputStyle}
        label="Username"
        value={username}
        placeholder="beubeuOfThe33"
        onChangeText={text => setUsername(text)}
      />
      <BabbleInput
        style={inputStyle}
        label="Password"
        value={password}
        placeholder="**********"
        onChangeText={text => setPassword(text)}
        autoComplete="password"
        secureTextEntry
      />
      <BabbleInput
        style={inputStyle}
        label="Confirm password"
        value={passwordConfirm}
        placeholder="**********"
        onChangeText={text => setPasswordConfirm(text)}
        autoComplete="password-new"
        secureTextEntry
      />
      <BabbleButton style={buttonStyle} onPress={() => onRegister()}>
        Sign up
      </BabbleButton>
    </View>
  );
}

export default RegisterForm;
