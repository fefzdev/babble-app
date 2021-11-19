import React from 'react';
import { ScrollView, View } from 'react-native';
import colors from '../../assets/style/colors';

function Background({ children }) {
  const containerStyle = {
    backgroundColor: colors.orange[50],
    flex: 1,
    paddingTop: 44,
  };

  return (
    <View style={containerStyle}>
      <ScrollView>{children}</ScrollView>
    </View>
  );
}

export default Background;
