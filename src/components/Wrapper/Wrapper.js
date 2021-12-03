import { globalStyle } from 'app/assets/style/style';
import React from 'react';
import { View } from 'react-native';

function Wrapper({ children, padding = globalStyle.wrapper }) {
  return <View style={padding}>{children}</View>;
}

export default Wrapper;
