import Icon from '@expo/vector-icons/Entypo';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '@/constants/Colors';
import { useAuthentication } from '@/hooks/useAuthentication';

const auth = getAuth();

export default function Email() {
  const { mail } = useSelector(state => state.user);
  const { user } = useAuthentication();
  console.log(auth.currentUser);
  const sendEmail = async () => {
    await sendEmailVerification(auth.currentUser);
  };

  const isEmailVerified = () => {
    if (user?.emailVerified)
      return <Text style={styles.emailVerifiedText}>Email verifié</Text>;
    return (
      <View style={styles.emailNotVerified}>
        <Text style={styles.emailNotVerifiedText}>
          Votre email n'est pas verifié
        </Text>
        <TouchableOpacity
          style={styles.verifyEmail}
          onPress={() => sendEmail()}>
          <Icon
            style={styles.icon}
            name="shield"
            size={16}
            color={Colors.orange[1000]}
          />
          <Text style={styles.verifyEmailText}>Verifier</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.mailContainer}>
      <View style={styles.mail}>
        <Icon
          style={styles.icon}
          name={user?.emailVerified ? 'lock' : 'lock-open'}
          size={16}
          color={user?.emailVerified ? Colors.orange[1000] : Colors.red[800]}
        />
        <Text style={styles.mailText}>{mail}</Text>
      </View>
      {isEmailVerified()}
    </View>
  );
}

const styles = StyleSheet.create({
  mailContainer: {
    alignItems: 'center',
  },
  mail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  mailText: {
    fontSize: 16,
  },
  emailNotVerified: {
    alignItems: 'center',
  },
  emailNotVerifiedText: {
    color: Colors.red[1000],
    marginTop: 4,
  },
  verifyEmail: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: Colors.orange[200],
    borderRadius: 8,
    marginTop: 8,
  },
  verifyEmailText: {
    color: Colors.orange[1000],
    fontWeight: 'bold',
  },
  emailVerifiedText: {
    color: Colors.orange[1000],
  },
});
