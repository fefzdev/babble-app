import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';

import BabbleButton from '@/components/BabbleButton';
import BabbleInfoBox from '@/components/BabbleInfoBox';
import Colors from '@/constants/Colors';
import { UserRoles } from '@/types/UserRoles.enums';

export default function AcceptedChatPopup({ isVisible, onClose, onSubmit }) {
  const roles = [
    {
      title: 'Talker',
      value: UserRoles.TALKER,
      description: (
        <Text style={styles.text}>
          En choisissant le rôle de <Text style={styles.role}>Talker</Text>, des
          Listeners seront là pour vous écouter et vous conseiller quelque soit
          votre problème.
        </Text>
      ),
      image: require('@/assets/images/talker-image.png'),
    },
    {
      title: 'Listener',
      value: UserRoles.LISTENER,
      description: (
        <Text style={styles.text}>
          En choisissant le rôle de <Text style={styles.role}>Listener</Text>,
          vous êtes ici pour écouter et discuter avec des Talkers dans le besoin
          d'une oreille attentive.
        </Text>
      ),
      image: require('@/assets/images/listener-image.png'),
    },
  ];

  const card = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.alert}>{item.description}</Text>
      <BabbleButton onPress={() => onSubmit(item.value)} style={styles.action}>
        Je souhaite être {item.title}
      </BabbleButton>
    </View>
  );

  return (
    <Modal style={styles.modal} isVisible={isVisible} onBackdropPress={onClose}>
      <View style={[styles.container]}>
        <Carousel
          data={roles}
          renderItem={card}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 40}
          layout={'default'}
        />
        <BabbleInfoBox
          style={styles.info}
          content="Vous pourrez modifier votre choix plus tard."
        />
      </View>
      <TouchableOpacity style={styles.close} onPress={onClose}>
        <Text style={styles.closeText}>Je ne sais pas encore</Text>
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
    paddingTop: 40,
    paddingBottom: 24,
  },
  image: {
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
  title: {
    marginTop: 8,
    fontSize: 24,
    textAlign: 'center',
  },
  alert: {
    marginTop: 8,
    fontSize: 18,
    textAlign: 'center',
  },
  action: {
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
  role: {
    fontWeight: 'bold',
    color: Colors.orange[1000],
  },
});
