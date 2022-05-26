import { Entypo } from '@expo/vector-icons';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BabbleModal from '@/components/BabbleModal';
import Colors from '@/constants/Colors';

export default function CameraScreen({
  isVisible,
  onClose,
  style,
  onPictureTaken,
}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.front);
  const [flashMode] = useState(FlashMode.off);
  const [camera, setCamera] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    const picture = await camera.takePictureAsync({ isImageMirror: true });
    onPictureTaken(picture);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <BabbleModal isVisible={isVisible} onClose={() => onClose()} style={style}>
      <View style={[styles.container]}>
        <Camera
          style={styles.camera}
          type={type}
          ratio={'1:1'}
          flashMode={flashMode}
          ref={ref => setCamera(ref)}
        />
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onClose();
            }}>
            <Text style={styles.buttonText}> Annuler </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shoot} onPress={() => takePicture()}>
            <Entypo name="circle" size={64} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back,
              );
            }}>
            <Entypo name="cycle" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </BabbleModal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  camera: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -Dimensions.get('window').width / 2 }],
  },
  buttonContainer: {
    paddingTop: 48,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  actionsContainer: {
    paddingBottom: 64,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  button: {
    minWidth: '30%',
    alignItems: 'center',
    padding: 16,
    color: Colors.white,
  },
  buttonText: {
    color: Colors.white,
  },
});
