import { globalStyle } from 'app/assets/style/style';
import Background from 'app/components/Background';
import Wrapper from 'app/components/Wrapper';
import TestDB from 'app/database/Model/TestDB';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

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

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    TestModel.listen(data => setChat(data));
  }, []);
  /* eslint-enabled react-hooks/exhaustive-deps */

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
