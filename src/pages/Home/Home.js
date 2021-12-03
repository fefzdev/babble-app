import { globalStyle } from 'app/assets/style/style';
import Background from 'app/components/Background';
import Counter from 'app/components/Counter';
import Wrapper from 'app/components/Wrapper';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';

function Home({ navigation }) {
  const [inputValue, setInputValue] = useState('Tapez un truc');
  const currentUser = useSelector(state => state.user.current);
  const currentUserMail = useSelector(state => state.user.mail);

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
            This is Home {currentUser} ({currentUserMail})
          </Text>
          <TextInput
            style={globalStyle.input}
            value={inputValue}
            onChangeText={text => {
              setInputValue(text);
            }}
          />
          <Counter />
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
        </View>
      </Wrapper>
    </Background>
  );
}

export default Home;
