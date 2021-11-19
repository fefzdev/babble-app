import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import colors from '../../../assets/style/colors';
import fonts from '../../../assets/style/fonts';

function Heading({}) {
  const containerStyle = {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 32,
  };

  const textStyle = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 24,
    fontSize: 16,
    color: colors.black[600],
  };

  const highlightStyle = {
    color: colors.orange[1000],
    fontWeight: 'bold',
    marginLeft: 4,
  };

  return (
    <View style={containerStyle}>
      <Text style={fonts.bigTitle}>
        Welcome to <Text style={highlightStyle}>Babbles</Text>
      </Text>
      <Text style={textStyle}>
        Don’t have an account?
        <TouchableOpacity>
          <Text style={highlightStyle}>Sign up</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}

export default Heading;
