import { StyleSheet } from 'react-native';

import Background from '@/components/Background';
import SubScreenHeader from '@/components/SubScreenHeader';
import UserAccount from '@/modules/UserAccount';

export default function Role({ navigation }) {
  return (
    <Background style={styles.container} noScroll>
      <SubScreenHeader navigation={navigation} title="Votre compte" />
      <UserAccount />
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
  text: {
    marginTop: 24,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
  },
  role: {
    fontWeight: 'bold',
  },
  infoBox: {
    marginTop: 24,
  },
  button: {
    marginTop: 20,
  },
});
