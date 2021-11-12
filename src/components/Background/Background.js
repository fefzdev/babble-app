import React from 'react';
import {ScrollView, View} from 'react-native';
import {globalVariable} from '../../assets/style/style';

function Background({children}) {
  return (
    <View
      style={{
        backgroundColor: globalVariable.pageBgColor,
        flex: 1,
      }}>
      <ScrollView>{children}</ScrollView>
    </View>
  );
}

export default Background;
