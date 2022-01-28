import { globalStyle } from 'app/assets/style/style';
import useRepository from 'app/database/Model';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

function ShowAvailableUsers({ onUserClick }) {
  const currentUserUid = useSelector(state => state.user.uid);
  const [allListeners, setAllListeners] = useState([]);
  const [talkersWantsToTalk, setTalkersWantsToTalk] = useState([]);
  const { userRepository, roomRepository } = useRepository();
  const currentUserType = useSelector(state => state.user.type);
  const availableUserStyle = StyleSheet.create({
    view: {
      padding: 10,
      backgroundColor: '#00a9ff',
    },
  });

  useEffect(() => {
    userRepository.listen(data => {
      setAllListeners(data);
    });

    roomRepository.listen(data => {
      setTalkersWantsToTalk(data);
    });
  }, []);

  const buildListenersAvailable = () =>
    allListeners
      .filter(user => user.available)
      .map(user => (
        <Text
          key={user.uid}
          onPress={() => onUserClick(user.uid)}
          style={globalStyle.button}>
          {user.name}
        </Text>
      ));

  const buildTalkerWantsToTalk = () => {
    return talkersWantsToTalk
      .filter(t => t.users.includes(currentUserUid))
      .map(t => (
        <Text key={t.uid} onPress={() => {}} style={globalStyle.button}>
          {t.users[0]} wants to talk !
        </Text>
      ));
  };

  return (
    <View style={currentUserType === 'talker' ? availableUserStyle.view : ''}>
      {currentUserType === 'talker' ? (
        buildListenersAvailable().length !== 0 ? (
          buildListenersAvailable()
        ) : (
          <Text>No users available !</Text>
        )
      ) : buildTalkerWantsToTalk().length !== 0 ? (
        buildTalkerWantsToTalk()
      ) : (
        <Text>No talkers wants to talk</Text>
      )}
    </View>
  );
}

export default ShowAvailableUsers;
