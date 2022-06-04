import { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Background from '@/components/Background';

import InitialMessage from './components/InitialMessage';
import Message from './components/Message';
import RoomInput from './components/RoomInput';

export default function RoomModule({ room, messages }) {
  const scrollViewRef = useRef();
  const buildMessages = () =>
    messages
      ? messages.map((message, index) => (
          <Message key={index} message={message} />
        ))
      : null;

  return (
    <Background noScroll style={styles.background}>
      <ScrollView
        contentContainerStyle={styles.list}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }>
        <View style={styles.test}>
          <InitialMessage name={room.otherUserData.name} />
          {buildMessages()}
        </View>
      </ScrollView>
      <RoomInput style={styles.input} roomUid={room.uid} />
    </Background>
  );
}

const styles = StyleSheet.create({
  background: {
    paddingTop: 0,
    paddingHorizontal: 0,
    justifyContent: 'space-between',
  },
  list: {
    padding: 20,
  },
});
