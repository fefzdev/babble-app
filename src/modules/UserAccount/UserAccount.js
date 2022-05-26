import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import BabbleButton from '@/components/BabbleButton';
import Background from '@/components/Background';
import Role from '@/components/RoleBlock';

import ProfilePicture from './components/ProfilePicture';

export default function UserAccount({ navigation }) {
  const { name } = useSelector(state => state.user);

  return (
    <Background>
      <View style={styles.background}>
        <ProfilePicture navigation={navigation} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
        </View>
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
  nameContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
  },
});
