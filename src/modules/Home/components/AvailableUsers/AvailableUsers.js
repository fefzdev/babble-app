import colors from 'app/assets/style/colors';
import fonts from 'app/assets/style/fonts';
import useRepository from 'app/database/Model';
import { addToWaitlist } from 'app/store/Rooms';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

function AvailableUsers() {
  const { userRepository } = useRepository();
  const [allUsers, setAllUsers] = useState([]);
  const waitlist = useSelector(state => state.rooms.waitlist);
  const dispatch = useDispatch();

  const style = StyleSheet.create({
    view: {
      marginTop: 32,
    },
    title: {},
    subtitle: {
      marginTop: 8,
    },
    itemContainer: {
      marginLeft: -16,
      marginTop: 16,
    },
    item: {
      marginLeft: 16,
      flex: 1,
      alignItems: 'center',
    },
    image: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginTop: 4,
      backgroundColor: colors.orange['200'],
    },
  });

  useEffect(() => {
    userRepository.listen(data => {
      console.log(data);
      setAllUsers(data);
    });
  }, []);

  useEffect(() => {
    console.log(buildUsersAvailable());
  }, [buildUsersAvailable]);

  const addToWaitingList = userId => dispatch(addToWaitlist(userId));

  const buildUsersAvailable = () =>
    allUsers
      .filter(user => user.available)
      .map(user => (
        <View
          opacity={waitlist.includes(user.uid) ? 0.5 : 1}
          style={style.item}
          key={user.uid}
          onTouchStart={() => addToWaitingList(user.uid)}>
          <View style={style.image} />
          <Text key={user.uid} onPress={() => console.log(user.uid)}>
            {user.name}
          </Text>
        </View>
      ));

  return (
    <View style={style.view}>
      <Text style={[style.title, fonts.title]}>Utilisateurs disponibles</Text>
      <Text style={[style.subtitle, fonts.callout]}>
        Choisissez la personne avec qui vous voulez échanger
      </Text>
      <ScrollView style={style.itemContainer} horizontal={true}>
        {buildUsersAvailable()}
      </ScrollView>
    </View>
  );
}

export default AvailableUsers;
