import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {globalStyle} from '../../assets/style/style';
import Background from '../../components/Background';
import Wrapper from '../../components/Wrapper';
import {firebase} from '../../database/config';

function Test() {
  const [chat, setChat] = useState(null);
  const handleChat = () => {
    if (chat) {
      let chatArray = [];
      for (const name in chat.val()) {
        let value = chat.val()[name];
        chatArray.push({name: name, value: value});
      }
      return chatArray.map((chatItem, index) => (
        <Text key={index} style={globalStyle.button}>
          {chatItem.name} : {chatItem.value}
        </Text>
      ));
    }
    return <Text>Chargement</Text>;
  };
  useEffect(() => {
    firebase
      .database()
      .ref('Test')
      .on('value', snap => {
        setChat(snap);
      });
  }, []);

  return (
    <Background>
      <Wrapper>
        <View>
          <Text>Ici BDD</Text>
          <View>{handleChat()}</View>
        </View>
      </Wrapper>
    </Background>
  );
}

export default Test;
