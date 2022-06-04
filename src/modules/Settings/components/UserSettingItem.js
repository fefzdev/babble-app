import Icon from '@expo/vector-icons/Entypo';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import UserImage from '@/components/UserImage';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

export default function UserSettingItem({ onPress }) {
  const { profilePicture, mail, name } = useSelector(state => state.user);

  return (
    <TouchableOpacity style={styles.accountBlock} onPress={onPress}>
      <UserImage image={profilePicture} imageStyle={styles.image} size={64} />
      <View style={styles.profileContent}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{mail}</Text>
      </View>
      <Icon name="chevron-right" size={24} color={Colors.orange[500]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  accountBlock: {
    marginTop: 16,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContent: {
    marginLeft: 12,
    flexGrow: 1,
  },
  name: {
    ...Fonts.title,
    fontWeight: 'normal',
    marginBottom: 4,
  },
  email: {
    color: Colors.orange[700],
  },
});
