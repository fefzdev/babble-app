import Background from 'app/components/Background';
import useRepository from 'app/database/Model';
import React from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { useSelector } from 'react-redux';

import InitialMessage from './components/InitialMessage';
import Message from './components/Message';

export default function RoomModule({ listener, roomUid, messages }) {
  const { roomRepository } = useRepository();
  const currentUser = useSelector(state => state.user);

  const [inputText, setInputText] = useState('Enter text here');

  const handlePost = () =>
    roomRepository.post(roomUid, currentUser.uid, inputText);

  const buildMessages = () =>
    messages.map((message, index) => <Message key={index} message={message} />);

  const styles = StyleSheet.create({
    background: {
      paddingTop: 0,
      paddingHorizontal: 0,
    },
    messagesList: {
      padding: 20,
    },
  });

  return (
    <Background noScroll={true} style={styles.background}>
      <ScrollView style={styles.messagesList}>
        <InitialMessage name={listener.name} />
        {buildMessages()}
      </ScrollView>
      <TextInput onChangeText={setInputText} value={inputText} />
      <Text onPress={handlePost}>Post</Text>
    </Background>
  );
}
