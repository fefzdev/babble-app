import useRepository from 'app/database/Model';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ScrollView, Text, TextInput } from 'react-native';
import { useSelector } from 'react-redux';

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
    roomRepository.listenForKey('messages', roomUid, messages => {
      if (messages) {
        setRoomMessages(messages);
      }
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
    return roomMessages.map((content, index) => {
      const name = Object.entries(content)[0][0];
      return (
        <Text key={index}>
          {name} : {content[name]}
        </Text>
      );
    });
  };

  if (room && talker && listener) {
    return (
      <ScrollView>
        <Text>
          Welcome {talker.name} and {listener.name}
        </Text>
        <ScrollView>{buildMessages()}</ScrollView>
        <TextInput onChangeText={setInputText} value={inputText} />
        <Text onPress={handlePost}>Post</Text>
      </ScrollView>
    );
  }

  return <Text>Chargement</Text>;
}
