import React from 'react';
import {View} from 'react-native';
import {globalStyle} from '../../assets/style/style';

function Wrapper({children, padding = globalStyle.wrapper}) {
  return <View style={padding}>{children}</View>;
}

export default Wrapper;
