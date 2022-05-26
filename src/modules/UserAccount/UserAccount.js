import { StyleSheet, View } from 'react-native';

import Background from '@/components/Background';

import ProfilePicture from './components/ProfilePicture';
import UserInfos from './components/UserInfos';

export default function UserAccount() {
  return (
    <Background>
      <View style={styles.background}>
        <ProfilePicture />
        <UserInfos style={styles.userInfos} />
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
  userInfos: {
    marginVertical: 16,
  },
});
