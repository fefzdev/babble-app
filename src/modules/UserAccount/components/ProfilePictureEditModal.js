import Icon from '@expo/vector-icons/Entypo';
import {
  getMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import BabbleLoader from '@/components/BabbleLoader';
import BabbleModal from '@/components/BabbleModal';
import UserImage from '@/components/UserImage';
import Colors from '@/constants/Colors';
import CameraScreen from '@/screens/CameraScreen';

export default function ProfilePictureEditModal({ isDisplayed, onClose }) {
  const { profilePicture: defaultUserPicture } = useSelector(
    state => state.user,
  );
  const [isCameraDisplayed, setIsCameraDisplayed] = useState(false);
  const [userPicture, setUserPicture] = useState(defaultUserPicture);
  const [isLoading, setIsLoading] = useState(false);

  const isUpdated = () => defaultUserPicture !== userPicture;

  const updateUserPicture = picture => {
    setUserPicture(picture);
  };

  const removeProfilePic = () => {
    setUserPicture(defaultUserPicture);
  };

  const openCameraRoll = async () => {
    setIsLoading(true);
    const permission = await getMediaLibraryPermissionsAsync();

    if (!permission.granted) await requestMediaLibraryPermissionsAsync();

    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) updateUserPicture(result);
    setIsLoading(false);
  };

  const openCamera = async () => setIsCameraDisplayed(true);

  const takePicture = picture => {
    setIsCameraDisplayed(false);
    updateUserPicture(picture);
  };

  const closeProfilePictureEditModal = () => {
    setUserPicture(defaultUserPicture);
    onClose();
  };

  const camera = () => {
    if (!isCameraDisplayed) return;
    return (
      <CameraScreen
        isVisible={isCameraDisplayed}
        style={styles.camera}
        onClose={() => setIsCameraDisplayed(false)}
        onPictureTaken={takePicture}
      />
    );
  };

  return (
    <BabbleModal
      isVisible={isDisplayed}
      onClose={() => closeProfilePictureEditModal()}
      canBeSwiped={false}
      style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity onPress={() => closeProfilePictureEditModal()}>
          <Text style={styles.cancel}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => (isUpdated() ? closeProfilePictureEditModal() : null)}>
          {isUpdated() ? <Text style={styles.cancel}>Valider</Text> : null}
        </TouchableOpacity>
      </View>
      <View style={styles.profilePicture}>
        {!isLoading ? (
          <UserImage image={userPicture} imageStyle={styles.image} size={240} />
        ) : (
          <BabbleLoader style={styles.image} />
        )}
        {isUpdated() ? (
          <TouchableOpacity
            style={styles.remove}
            onPress={() => removeProfilePic()}>
            <Icon name="cross" size={24} color={Colors.orange[1000]} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => openCameraRoll()}
          style={styles.action}>
          <Icon name="images" size={32} color={Colors.orange[1000]} />
          <Text style={styles.actionLabel}>Galerie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={() => openCamera()}>
          <Icon name="camera" size={32} color={Colors.orange[1000]} />
          <Text style={styles.actionLabel}>Appareil photo</Text>
        </TouchableOpacity>
      </View>
      {camera()}
    </BabbleModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 4,
  },
  profilePicture: {
    marginTop: 24,
  },
  image: {
    flex: 0,
    borderRadius: 8,
    backgroundColor: Colors.orange[200],
    width: 240,
    height: 240,
  },
  actions: {
    flexDirection: 'row',
    marginRight: -8,
    marginTop: 16,
  },
  action: {
    padding: 8,
    borderColor: Colors.orange[1000],
    borderWidth: 2,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginRight: 8,
  },
  actionLabel: {
    marginTop: 8,
  },
  remove: {
    padding: 4,
    position: 'absolute',
    backgroundColor: Colors.orange[300],
    borderRadius: 32,
    borderColor: Colors.white,
    borderWidth: 2,
    top: -8,
    right: -8,
  },

  camera: {
    backgroundColor: 'black',
    top: 0,
    padding: 0,
  },
});
