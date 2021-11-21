import React, { useState } from 'react';
import { View } from 'react-native';
import BabbleButton from '../../../components/BabbleButton/BabbleButton';
import BabbleInput from '../../../components/BabbleInput';
import User from '../../../database/Model/Users';
import { useDispatch } from 'react-redux';
import { setErrorMessage } from '../../../store/App';

function LoginForm({ onError }) {
  const [password, setPassword] = useState(null);
  const [mail, setMail] = useState(null);
  const UserModel = new User();
  const dispatch = useDispatch();

  const onLogin = async () => {
    await UserModel.connect(mail, password, error =>
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
        label="Password"
        value={password}
        placeholder="**********"
        onChangeText={text => setPassword(text)}
        autoComplete="password"
        secureTextEntry
      />
      <BabbleButton style={buttonStyle} onPress={() => onLogin()}>
        Login
      </BabbleButton>
    </View>
  );
}

export default LoginForm;
