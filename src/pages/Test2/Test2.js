import { globalStyle } from 'app/assets/style/style';
import Background from 'app/components/Background';
import Wrapper from 'app/components/Wrapper';
import useRepository from 'app/database/Model';
import ShowAvailableUsers from 'app/modules/ShowAvailableUsers';
import { setUserAvailable } from 'app/store/User';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';

function Test2({ navigation }) {
  const [inputValue, setInputValue] = useState('Tapez un truc');
  const currentUser = useSelector(state => state.user.current);
  const currentUserMail = useSelector(state => state.user.mail);
  const currentUserUID = useSelector(state => state.user.uid);
  const currentUserAvailable = useSelector(state => state.user.available);
  const currentUserType = useSelector(state => state.user.type);
  const { userRepository } = useRepository();

  const setAvailable = () => {
    userRepository.updateData(currentUserUID, {
      available: !currentUserAvailable,
      type: 'listener',
    });
  };

  return (
    <Background>
      <Wrapper>
        <View
          style={{
            backgroundColor: 'white',
            padding: 50,
            borderRadius: 50,
          }}>
          <Text>
            This is Home {currentUser} ({currentUserMail}) {currentUserUID}{' '}
            Available : {currentUserAvailable ? 'true' : 'false'} type :{' '}
            {currentUserType}
          </Text>
          <TextInput
            style={globalStyle.input}
            value={inputValue}
            onChangeText={text => {
              setInputValue(text);
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <View
            onTouchStart={() => navigation.navigate('Test')}
            style={globalStyle.button}>
            <Text>Go to page test</Text>
          </View>
          <View
            onTouchStart={() => navigation.navigate('Room')}
            style={globalStyle.button}>
            <Text>Go to page Room</Text>
          </View>

          <ShowAvailableUsers />
          <Text style={globalStyle.button} onPress={setAvailable}>
            Set available
          </Text>
        </View>
      </Wrapper>
    </Background>
  );
}
