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
      return { firstPart: "Don't have an account?", secondPart: 'Sign up' };
    }
    return { firstPart: 'Already have an account?', secondPart: 'Log in' };
  };

  return (
    <View style={containerStyle}>
      <Text style={Fonts.bigTitle}>
        Welcome to <Text style={highlightStyle}>Babbles</Text>
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
