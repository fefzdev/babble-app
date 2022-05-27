import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import UserImage from '@/components/UserImage';
import Colors from '@/constants/Colors';

export default function WaitingListItem({
  user,
  onPress,
  onRemove,
  isRoomActive,
}) {
  const info = () => {
    if (isRoomActive) return <Text>Demande acceptée !</Text>;
    return <Text>Demande envoyée...</Text>;
  };

  const rightAction = () => {
    if (isRoomActive)
      return (
        <TouchableOpacity onPress={() => onPress()}>
          <View style={style.remove}>
            <Text style={style.removeText}>Discuter</Text>
          </View>
        </TouchableOpacity>
      );
    return (
      <TouchableOpacity onPress={() => onRemove()}>
        <View style={style.remove}>
          <Text style={style.removeText}>Annuler</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View key={user.uid + '-waiting'} style={style.item}>
      <UserImage
        style={style.image}
        imageStyle={style.imageRadius}
        image={user.profilePicture}
      />
      <View style={style.infos}>
        <Text key={user.uid} style={style.userName}>
          {user.name}
        </Text>
        {info()}
      </View>
      {rightAction()}
    </View>
  );
}

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
    backgroundColor: Colors.orange[200],
    borderRadius: 8,
  },
  removeText: {
    color: Colors.orange[1000],
  },
});
