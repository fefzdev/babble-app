import Icon from '@expo/vector-icons/Entypo';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';

import BabbleInfoBox from '@/components/BabbleInfoBox';
import UserImage from '@/components/UserImage';
import Colors from '@/constants/Colors';

export default function AcceptedChatPopup({ isVisible, onClose, rooms }) {
  const card = ({ item: { otherUserData } }) => {
    return (
      <View style={styles.card}>
        <UserImage image={otherUserData.profilePicture} size={80} />
        <Text style={styles.name}>{otherUserData.name}</Text>
        <Text style={styles.alert}>Votre invitation à été acceptée !</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.button, styles.cancel]}>
            <Icon name="cross" size={24} color={Colors.orange[1000]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="check" size={24} color={Colors.orange[50]} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Modal style={styles.modal} isVisible={isVisible} onBackdropPress={onClose}>
      <View style={[styles.container]}>
        <Carousel
          data={rooms}
          renderItem={card}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 40}
          layout={'default'}
        />
        <BabbleInfoBox
          style={styles.info}
          content="Vous pouvez choisir avec qui vous souhaitez disctuer. Choisissez bien ! Vous ne pouvez avoir qu'un chat à la fois."
        />
      </View>
      <TouchableOpacity style={styles.close} onPress={onClose}>
        <Text style={styles.closeText}>Fermer</Text>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    borderRadius: 32,
  },
  card: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  name: {
    marginTop: 8,
    fontSize: 24,
    textAlign: 'center',
  },
  alert: {
    marginTop: 8,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.orange[1000],
  },
  actions: {
    width: '100%',
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 16,
    borderRadius: 32,
    backgroundColor: Colors.orange[1000],
  },
  cancel: {
    backgroundColor: Colors.orange[200],
  },
  info: {
    marginTop: 16,
    marginHorizontal: 20,
  },
  close: {
    marginTop: 32,
  },
  closeText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});
