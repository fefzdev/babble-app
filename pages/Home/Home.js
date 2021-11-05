import React from 'react';
import {Text, View} from 'react-native';
import Counter from '../../components/Counter';

function Home({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text onPress={() => navigation.navigate('Test')}>Home</Text>
      <Counter />
    </View>
  );
}

export default Home;
