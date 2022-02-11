import colors from 'app/assets/style/colors';
import fonts from 'app/assets/style/fonts';
import useRepository from 'app/database/Model';
import { removeFromWaitlist } from 'app/store/Rooms';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

function WaitingList() {
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
      marginTop: 16,
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
    },
    image: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginTop: 4,
      backgroundColor: colors.orange['200'],
    },
    infos: {
      marginLeft: 8,
    },
    userName: {
      fontWeight: 'bold',
      marginBottom: 4,
    },
  });

  const removeFromWaitingList = userId => dispatch(removeFromWaitlist(userId));

  useEffect(() => {
    userRepository.listen(data => {
      setAllUsers(data);
    });
  }, []);

  const buildUsersAvailable = () =>
    allUsers
      .filter(({ uid }) => waitlist.includes(uid))
      .map(user => (
        <View
          onTouchStart={() => removeFromWaitingList(user.uid)}
          style={style.item}
          key={user.uid + '-waiting'}>
          <View style={style.image} />
          <View style={style.infos}>
            <Text
              key={user.uid}
              onPress={() => console.log(user.uid)}
              style={style.userName}>
              {user.name}
            </Text>
            <Text>Demande envoyée...</Text>
          </View>
        </View>
      ));

  return (
    <View style={style.view}>
      <Text style={[style.title, fonts.title]}>Demandes en attente</Text>
      <Text style={[style.subtitle, fonts.callout]}>
        Nous vous previendrons dès qu’un Listener aura accepté votre demande
      </Text>
      {buildUsersAvailable()}
    </View>
  );
}

export default WaitingList;
