import { globalStyle } from 'app/assets/style/style';
import useRepository from 'app/database/Model';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  postButton: { ...globalStyle.button, backgroundColor: 'aliceblue' },
  view: { padding: 10 },
});

export default function Room({ route, navigation }) {
  const { userRepository, roomRepository } = useRepository();
  const currentUser = useSelector(state => state.user);
  const roomUid = route.params.roomId;

  const [room, setRoom] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const [talker, setTalker] = useState(null);
  const [listener, setListener] = useState(null);
  const [inputText, setInputText] = useState('Enter text here');

  useEffect(() => {
    roomRepository.listenForKey('messages', roomUid, m => {
      setRoomMessages(m ?? []);
    });

    roomRepository.find(roomUid, r => {
      setRoom(r);
      userRepository.find(r.users[0], tu => setTalker(tu));
      userRepository.find(r.users[1], lu => setListener(lu));
    });
  }, []);

  const handlePost = () => {
    roomRepository.post(roomUid, currentUser.uid, inputText);
  };

  const buildMessages = () => {
    return roomMessages.map((mess, key) => (
      <Text key={key} style={globalStyle.button}>
        {currentUser.type} : {mess[currentUser.uid]}
      </Text>
    ));
  };

  if (room && talker && listener) {
    return (
      <ScrollView style={styles.view}>
        <Text>
          Welcome {talker.name} and {listener.name}
        </Text>
        {buildMessages()}
        <TextInput
          style={styles.input}
          onChangeText={setInputText}
          value={inputText}
        />
        <Text onPress={handlePost} style={styles.postButton}>
          Post
        </Text>
      </ScrollView>
    );
  }

  return <Text>Chargement</Text>;
}
