import Icon from '@expo/vector-icons/Entypo';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import uuid from 'react-native-uuid';
import { useSelector } from 'react-redux';

import UserImage from '@/components/UserImage';
import Colors from '@/constants/Colors';
import useRepository from '@/database/Model';

import ProfilePictureEditModal from './ProfilePictureEditModal';

export default function ProfilePicture() {
  const { profilePicture, uid } = useSelector(state => state.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { userRepository } = useRepository();

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.error(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), uuid.v4());
    await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
  }

  const onPopupClose = async imageUrl => {
    try {
      if (imageUrl) {
        const image = await uploadImageAsync(imageUrl);
        userRepository.updateData(uid, { profilePicture: image });
      }
    } catch (e) {
      console.error(e);
    }
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <UserImage image={profilePicture} imageStyle={styles.image} size={124} />
      <TouchableOpacity
        style={styles.edit}
        onPress={() => setIsModalVisible(true)}>
        <Icon name="edit" size={16} color={Colors.orange[1000]} />
      </TouchableOpacity>

      <ProfilePictureEditModal
        isDisplayed={isModalVisible}
        onClose={onPopupClose}
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
