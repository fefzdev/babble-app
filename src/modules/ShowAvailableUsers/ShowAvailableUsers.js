import { globalStyle } from 'app/assets/style/style';
import useRepository from 'app/database/Model';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

function ShowAvailableUsers() {
  const { userRepository } = useRepository();
  const [allUsers, setAllUsers] = useState([]);

  const availableUserStyle = StyleSheet.create({
    view: {
      padding: 10,
      backgroundColor: '#00a9ff',
    },
  });
  const currentUserType = useSelector(state => state.user.type);

  useEffect(() => {
    userRepository.listen(data => {
      console.log(data);
      setAllUsers(data);
    });
  }, []);

  useEffect(() => {
    console.log(buildUsersAvailable());
  }, [buildUsersAvailable]);

  const buildUsersAvailable = () =>
    allUsers
      .filter(user => user.available)
      .map(user => (
        <Text
          key={user.uid}
          onPress={() => console.log(user.uid)}
          style={globalStyle.button}>
          {user.name}
        </Text>
      ));

  return (
    <View>
      <Text>{currentUserType}</Text>
      <View style={currentUserType === 'talker' ? availableUserStyle.view : ''}>
        {currentUserType === 'talker' ? (
          buildUsersAvailable().length !== 0 ? (
            buildUsersAvailable()
          ) : (
            <Text>No users available !</Text>
          )
        ) : (
          <Text>{currentUserType}</Text>
        )}
      </View>
    </View>
  );
}

export default ShowAvailableUsers;
