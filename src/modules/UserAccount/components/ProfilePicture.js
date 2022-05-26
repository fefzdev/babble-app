import Icon from '@expo/vector-icons/Entypo';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import UserImage from '@/components/UserImage';
import Colors from '@/constants/Colors';

import ProfilePictureEditModal from './ProfilePictureEditModal';

export default function ProfilePicture({ navigation }) {
  const { profilePicture } = useSelector(state => state.user);
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <UserImage image={profilePicture} imageStyle={styles.image} size={80} />
      <TouchableOpacity
        style={styles.edit}
        onPress={() => setIsModalVisible(true)}>
        <Icon name="edit" size={16} color={Colors.orange[1000]} />
      </TouchableOpacity>

      <ProfilePictureEditModal
        isDisplayed={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    borderColor: Colors.orange[1000],
    borderWidth: 2,
  },
  edit: {
    padding: 8,
    position: 'absolute',
    backgroundColor: Colors.orange[300],
    borderRadius: 32,
    borderColor: Colors.white,
    borderWidth: 2,
    top: -8,
    right: -8,
  },
});
