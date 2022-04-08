import colors from 'app/assets/style/colors';
import UserImage from 'app/components/UserImage';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function WaitingListItem({ user, onPress, onRemove }) {
  const style = StyleSheet.create({
    item: {
      marginTop: 16,
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
    },
    image: {
      width: 48,
      height: 48,
      marginTop: 4,
    },
    imageRadius: {
      borderRadius: 24,
    },
    infos: {
      marginLeft: 8,
      flex: 1,
    },
    userName: {
      fontWeight: 'bold',
      marginBottom: 4,
    },
    remove: {
      padding: 8,
      backgroundColor: colors.orange[200],
      borderRadius: 8,
    },
    removeText: {
      color: colors.orange[1000],
    },
  });

  return (
    <TouchableOpacity onPress={() => onPress()} key={user.uid + '-waiting'}>
      <View style={style.item}>
        <UserImage
          style={style.image}
          imageStyle={style.imageRadius}
          image={user.image}
        />
        <View style={style.infos}>
          <Text
            key={user.uid}
            onPress={() => console.log(user.uid)}
            style={style.userName}>
            {user.name}
          </Text>
          <Text>Demande envoyée...</Text>
        </View>
        <TouchableOpacity onPress={() => onRemove()}>
          <View style={style.remove}>
            <Text style={style.removeText}>Annuler</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default WaitingListItem;
