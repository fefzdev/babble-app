import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

export default function Heading({ onSwitch, isLogin }) {
  const switchText = () => {
    if (isLogin) {
      return {
        firstPart: 'Pas encore de compte ?',
        secondPart: "S'enregistrer",
      };
    }
    return { firstPart: 'Déjà un compte ?', secondPart: 'Se connecter' };
  };

  return (
    <View style={styles.containerStyle}>
      <Text style={[Fonts.bigTitle, styles.heading]}>
        Bienvenue sur <Text style={styles.highlightStyle}>Babble</Text>
      </Text>
      <View style={styles.switchContainer}>
        <Text style={styles.firstPart}>{switchText().firstPart}</Text>
        <TouchableOpacity onPress={onSwitch} style={styles.test}>
          <Text style={[styles.highlightStyle, styles.switch]}>
            {switchText().secondPart}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 24,
  },

  heading: {
    textAlign: 'center',
  },

  highlightStyle: {
    color: Colors.orange[1000],
    fontWeight: 'bold',
    marginLeft: 4,
  },

  switchContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },

  firstPart: {
    fontSize: 16,
  },

  switch: {
    fontSize: 16,
  },
});
