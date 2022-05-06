import colors from 'app/assets/style/colors';
import BabbleButton from 'app/components/BabbleButton';
import BabbleModal from 'app/components/BabbleModal';
import UserImage from 'app/components/UserImage';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';

import ProfilePictureEditModal from './ProfilePictureEditModal';

function ProfilePicture({ navigation }) {
  const { profilePicture } = useSelector(state => state.user);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    image: {
      borderColor: colors.orange[1000],
      borderWidth: 2,
    },
    edit: {
      padding: 8,
      position: 'absolute',
      backgroundColor: colors.orange[300],
      borderRadius: 32,
      borderColor: colors.white,
      borderWidth: 2,
      top: -8,
      right: -8,
    },
  });

  return (
    <View style={styles.container}>
      <UserImage image={profilePicture} imageStyle={styles.image} size={80} />
      <TouchableOpacity
        style={styles.edit}
        onPress={() => setIsModalVisible(true)}>
        <Icon name="edit" size={16} color={colors.orange[1000]} />
      </TouchableOpacity>

      <ProfilePictureEditModal
        isDisplayed={isModalVisible}
        updateIsDisplayed={setIsModalVisible}
      />
    </View>
  );
}

export default ProfilePicture;
