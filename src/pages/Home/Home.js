import React, {useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {globalStyle} from '../../assets/style/style';
import Background from '../../components/Background';
import Counter from '../../components/Counter';
import Wrapper from '../../components/Wrapper';
import {setUser} from '../../store/User';

function Home({navigation}) {
  const [inputValue, setInputValue] = useState('Tapez un truc');
  const currentUser = useSelector(state => state.user.current);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser(inputValue));
  }, [inputValue]);

  return (
    <Background>
      <Wrapper>
        <View
          style={{
            backgroundColor: 'white',
            padding: 50,
            borderRadius: 50,
          }}>
          <Text>This is Home {currentUser}</Text>
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
