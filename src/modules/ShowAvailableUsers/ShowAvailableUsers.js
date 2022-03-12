import { globalStyle } from 'app/assets/style/style';
import useRepository from 'app/database/Model';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

function ShowAvailableUsers({ onUserClick, navigateClick }) {
  const currentUserUid = useSelector(state => state.user.uid);
  const [allListeners, setAllListeners] = useState([]);
  const [talkersWantsToTalk, setTalkersWantsToTalk] = useState([]);
  const [listenerAvailable, setListenerAvailable] = useState([]);
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
      console.log('la', listenerAvailable);
      data
        .map(r => {
          userRepository.find(r.users[0], u => {
            if (
              !talkersWantsToTalk.filter(
                o => JSON.stringify(o) === JSON.stringify({ ...r, talker: u }),
              ).length
            ) {
              setTalkersWantsToTalk([
                ...talkersWantsToTalk,
                { ...r, talker: u },
              ]);
            }
          });
          return r;
        })
        .filter(r => {
          console.log('r in filter', r);
          return r.active && r.users[0] === currentUserUid;
        })
        .forEach(r => {
          console.log('room', r);
          userRepository.find(r.users[1], u => {
            console.log('hello');
            setListenerAvailable([...listenerAvailable, { ...r, listener: u }]);
          });
        });
    });
  }, []);

  const buildListenersAvailable = () => {
    const lAvailable = allListeners
      .filter(user => user.available)
      .map((user, index) => (
        <View key={index}>
          <Text
            onPress={() => onUserClick(user.uid)}
            style={globalStyle.button}>
            {user.name}
          </Text>
        </View>
      ));

    return (
      <View>
        {lAvailable}
        {acceptedRequest()}
      </View>
    );
  };

  const acceptedRequest = () =>
    listenerAvailable.map((la, index) => (
      <Text
        key={index}
        style={(globalStyle.button, { backgroundColor: 'aliceblue' })}
        onPress={() => navigateClick(la.uid)}>
        {la.listener.name}
      </Text>
    ));

  const buildTalkerWantsToTalk = () => {
    return talkersWantsToTalk
      .filter(t => t.users.includes(currentUserUid))
      .map((t, index) => (
        <Text
          key={index}
          onPress={() => {
            roomRepository.toggle(t.uid);
            navigateClick(t.uid);
          }}
          style={globalStyle.button}>
          {t.talker.name} wants to talk !
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
