import { StyleSheet, View } from 'react-native';

import ProfilePicture from './components/ProfilePicture';
import UserInfos from './components/UserInfos';

export default function UserAccount() {
  return (
    <View style={styles.background}>
      <ProfilePicture />
      <UserInfos style={styles.userInfos} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  nameContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  userInfos: {
    marginVertical: 16,
  },
});
