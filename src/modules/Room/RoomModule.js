import { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Background from '@/components/Background';
import useRepository from '@/database/Model';
import { setIsRoomOptionPopupDisplayed } from '@/store/App';

import InitialMessage from './components/InitialMessage';
import Message from './components/Message';
import RoomInput from './components/RoomInput';
import RoomOptionsPopup from './components/RoomOptionsPopup';

export default function RoomModule({ room, messages }) {
  const dispatch = useDispatch();
  const { uid } = useSelector(state => state.user);
  const { isRoomOptionsPopupDisplayed } = useSelector(state => state.app);
  const { rooms } = useRepository();

  useEffect(() => {
    dispatch(setIsRoomOptionPopupDisplayed(false));
    return () => {
      dispatch(setIsRoomOptionPopupDisplayed(false));
    };
  }, []);

  const scrollViewRef = useRef();
  const buildMessages = () =>
    messages
      ? messages.map((message, index) => (
          <Message key={index} message={message} />
        ))
      : null;

  const deleteRoom = () => {
    rooms.deleteRoom(room, uid);
    dispatch(setIsRoomOptionPopupDisplayed(false));
  };

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
      <RoomOptionsPopup
        isVisible={isRoomOptionsPopupDisplayed}
        onClose={() => dispatch(setIsRoomOptionPopupDisplayed(false))}
        onDelete={() => deleteRoom()}
      />
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
