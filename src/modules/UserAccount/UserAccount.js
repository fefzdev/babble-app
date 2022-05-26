import { StyleSheet, View } from 'react-native';

import BabbleButton from '@/components/BabbleButton';
import Background from '@/components/Background';
import Role from '@/components/RoleBlock';

import ProfilePicture from './components/ProfilePicture';

export default function UserAccount({ navigation }) {
  return (
    <Background>
      <View style={styles.background}>
        <ProfilePicture navigation={navigation} />
        <Role />
        <BabbleButton>Modifier mon rôle</BabbleButton>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
  },
});
