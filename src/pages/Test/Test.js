import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { globalStyle } from '../../assets/style/style';
import Background from '../../components/Background';
import Wrapper from '../../components/Wrapper';
import TestDB from '../../database/Model/TestDB';

function Test() {
  const TestModel = new TestDB();
  const [chat, setChat] = useState(null);
  const handleChat = () => {
    if (chat) {
      return chat.map(chatItem => (
        <Text
          onPress={() => TestModel.delete(chatItem.uid)}
          key={chatItem.uid}
          style={globalStyle.button}>
          {chatItem.name} : {chatItem.value}
        </Text>
      ));
    }
    return <Text>Chargement</Text>;
  };
  useEffect(() => {
    TestModel.listen(data => setChat(data));
  }, []);

  return (
    <Background>
      <Wrapper>
        <View>
          <Text onPress={() => TestModel.add({ name: 'Bibi', value: 'Prut' })}>
            Ici BDD
          </Text>
          <View>{handleChat()}</View>
        </View>
      </Wrapper>
    </Background>
  );
}

export default Test;
