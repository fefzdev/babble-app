import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import BabbleInput from '@/components/BabbleInput';
import BabbleModal from '@/components/BabbleModal';
import Fonts from '@/constants/Fonts';
import { useAuthentication } from '@/hooks/useAuthentication';

export default function PasswordEditModal({ isDisplayed, onClose }) {
  const [currentPasswordInput, setcurrentPasswordInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [passwordConfirmInput, setPasswordConfirmInput] = useState();

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
    flex: 1,
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
});
