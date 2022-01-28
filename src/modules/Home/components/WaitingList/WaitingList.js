import colors from 'app/assets/style/colors';
import fonts from 'app/assets/style/fonts';
import useRepository from 'app/database/Model';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

function WaitingList() {
  const { userRepository } = useRepository();
  const [allUsers, setAllUsers] = useState([]);

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
        <View style={style.item}>
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
