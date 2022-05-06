import colors from 'app/assets/style/colors';
import BabbleModal from 'app/components/BabbleModal';
import UserImage from 'app/components/UserImage';
import React, { useState } from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Camera } from 'react-native-vision-camera';
import { useSelector } from 'react-redux';

function ProfilePictureEditModal({ isDisplayed, updateIsDisplayed }) {
  const { profilePicture } = useSelector(state => state.user);
  const [updated, setUpdated] = useState(false);
  const [isCameraDisplayed, setIsCameraDisplayed] = useState(false);
  const [device, setDevice] = useState(false);

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
    image: {
      borderRadius: 8,
    },
    actions: {
      flexDirection: 'row',
      marginRight: -8,
      marginTop: 16,
    },
    action: {
      padding: 8,
      borderColor: colors.orange[1000],
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
      backgroundColor: colors.orange[300],
      borderRadius: 32,
      borderColor: colors.white,
      borderWidth: 2,
      top: -8,
      right: -8,
    },
  });

  const removeProfilePic = () => {};
  const openCameraRoll = () => {};
  const openCamera = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    if (cameraPermission === 'denied') await Linking.openSettings();
    if (cameraPermission !== 'authorized')
      await Camera.requestCameraPermission();
  };

  return (
    <BabbleModal
      isVisible={isDisplayed}
      onClose={() => updateIsDisplayed(false)}
      style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity onPress={() => updateIsDisplayed(false)}>
          <Text style={styles.cancel}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => (updated ? updateIsDisplayed(false) : null)}>
          {updated ? <Text style={styles.cancel}>Valider</Text> : null}
        </TouchableOpacity>
      </View>

      <View style={styles.profilePicture}>
        <UserImage
          image={profilePicture}
          imageStyle={styles.image}
          size={120}
        />
        {profilePicture ? (
          <TouchableOpacity
            style={styles.remove}
            onPress={() => removeProfilePic()}>
            <Icon name="cross" size={24} color={colors.orange[1000]} />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => openCameraRoll()}
          style={styles.action}>
          <Icon name="images" size={32} color={colors.orange[1000]} />
          <Text style={styles.actionLabel}>Galerie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={() => openCamera()}>
          <Icon name="camera" size={32} color={colors.orange[1000]} />
          <Text style={styles.actionLabel}>Appareil photo</Text>
        </TouchableOpacity>
      </View>
      {isCameraDisplayed ? null : null}
    </BabbleModal>
  );
}

export default ProfilePictureEditModal;
