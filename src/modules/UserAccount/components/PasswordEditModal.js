import Icon from '@expo/vector-icons/Entypo';
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  updatePassword,
} from 'firebase/auth';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import BabbleInput from '@/components/BabbleInput';
import BabbleModal from '@/components/BabbleModal';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { useAuthentication } from '@/hooks/useAuthentication';
import { setInfoMessage } from '@/store/App';

const auth = getAuth();

export default function PasswordEditModal({ isDisplayed, onClose }) {
  const [currentPasswordInput, setcurrentPasswordInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [passwordConfirmInput, setPasswordConfirmInput] = useState();

  const dispatch = useDispatch();
  const { user } = useAuthentication();

  const newPasswordMatch = () => passwordInput === passwordConfirmInput;
  const onFieldIsEmpty = () =>
    !currentPasswordInput || !passwordInput || !passwordConfirmInput;

  const onValidate = async () => {
    try {
      if (!newPasswordMatch())
        throw new Error('Les mots de passe ne correspondent pas');
      if (onFieldIsEmpty()) throw new Error('Veuillez remplir tous les champs');

      const credential = EmailAuthProvider.credential(
        user.email,
        passwordInput,
      );
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, passwordInput);

      dispatch(setInfoMessage('Mot de passe modifié avec succès'));
      onClose();
    } catch (error) {
      let errorMessage = error.message;
      if (error.code === 'auth/wrong-password')
        errorMessage = 'Mot de passe incorrect';
      Alert.alert(errorMessage);
    }
  };
  const onPopupClose = () => {
    setcurrentPasswordInput(null);
    setPasswordInput(null);
    setPasswordConfirmInput(null);
    onClose();
  };

  const onResetPasswordEmailSend = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      dispatch(
        setInfoMessage('Email de réinitialisation du mot de passe envoyé'),
      );
      onClose();
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const forgotPassword = () => {
    Alert.alert(
      'Réinitialisation de mot de passe',
      'Voulez vous recevoir un email de réinitialisation de mot de passe ?',
      [
        {
          text: 'Oui',
          style: 'default',
          onPress: async () => await onResetPasswordEmailSend(),
        },
        {
          text: 'Non',
          style: 'cancel',
          onPress: () => null,
        },
      ],
    );
  };

  return (
    <BabbleModal
      isVisible={isDisplayed}
      onClose={() => onClose()}
      canBeSwiped={false}
      style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.head}>
          <TouchableOpacity onPress={onPopupClose}>
            <Text style={styles.cancel}>Annuler</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Mot de passe</Text>
          <TouchableOpacity onPress={onValidate}>
            {<Text style={styles.cancel}>Valider</Text>}
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <BabbleInput
            style={styles.input}
            label="Votre mot de passe actuel"
            value={currentPasswordInput}
            placeholder="**********"
            onChangeText={text => setcurrentPasswordInput(text)}
            autoComplete="password"
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => forgotPassword()}>
            <Icon
              style={styles.icon}
              name="help"
              size={12}
              color={Colors.orange[1000]}
            />
            <Text style={styles.forgotPasswordText}>Mot de passe oublié</Text>
          </TouchableOpacity>

          <BabbleInput
            style={styles.input}
            label="Votre nouveau mot de passe"
            value={passwordInput}
            placeholder="**********"
            onChangeText={text => setPasswordInput(text)}
            autoComplete="password"
            secureTextEntry
          />
          <BabbleInput
            style={styles.input}
            label="Confirmer votre nouveau mot de passe"
            value={passwordConfirmInput}
            placeholder="**********"
            onChangeText={text => setPasswordConfirmInput(text)}
            secureTextEntry
          />
        </View>
      </View>
    </BabbleModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
  },
  container: {
    width: '100%',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 4,
  },
  title: {
    ...Fonts.title,
  },
  inputContainer: {
    marginTop: 8,
  },
  input: {
    marginTop: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: Colors.orange[200],
    borderRadius: 8,
    marginTop: 8,
  },
  forgotPasswordText: {
    color: Colors.orange[1000],
  },
  icon: {
    marginRight: 4,
  },
});
