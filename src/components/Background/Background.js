import colors from 'app/assets/style/colors';
import React from 'react';
import { ScrollView, View } from 'react-native';

function Background({ children, style, noScroll }) {
  const containerStyle = {
    backgroundColor: colors.orange[50],
    flex: 1,
    paddingTop: 44,
    paddingHorizontal: 20,
  };

  if (noScroll) {
    return <View style={[containerStyle, style]}>{children}</View>;
  }
  return (
    <View style={[containerStyle, style]}>
      <ScrollView>{children}</ScrollView>
    </View>
  );
}

export default Background;
