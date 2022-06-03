import { Text, TouchableOpacity, View } from 'react-native';

import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

function Heading({ onSwitch, isLogin }) {
  const containerStyle = {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 24,
  };

  const textStyle = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 24,
    fontSize: 16,
    color: Colors.black[600],
  };

  const highlightStyle = {
    color: Colors.orange[1000],
    fontWeight: 'bold',
    marginLeft: 4,
  };

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
    <View style={containerStyle}>
      <Text style={Fonts.bigTitle}>
        Bienvenue sur <Text style={highlightStyle}>Babbles</Text>
      </Text>
      <Text style={textStyle}>
        {switchText().firstPart}
        <TouchableOpacity onPress={onSwitch}>
          <Text style={highlightStyle}>{switchText().secondPart}</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}

export default Heading;
