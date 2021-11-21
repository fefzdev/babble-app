import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';

import colors from '../../../assets/style/colors';

function OtherLogs() {
  const items = [
    {
      action: () => console.log('apple pressed'),
      icon: require('../../../assets/images/apple.svg'),
    },
    {
      action: () => console.log('facebook pressed'),
      icon: require('../../../assets/images/facebook.svg'),
    },
    {
      action: () => console.log('google pressed'),
      icon: require('../../../assets/images/google.svg'),
    },
  ];

  const styles = {
    container: {
      paddingHorizontal: 20,
      marginBottom: 80,
    },
    line: {
      height: 2,
      backgroundColor: colors.orange['300'],
      marginHorizontal: 44,
      marginBottom: 24,
    },
    text: {
      textAlign: 'center',
      color: colors.black['600'],
    },
    list: {
      flexDirection: 'row',
      marginTop: 24,
    },
    item: {
      padding: 12,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: colors.orange['300'],
      backgroundColor: colors.white,
      flex: 1,
      alignItems: 'center',
    },
    middle: {
      marginHorizontal: 16,
    },
  };

  const itemsComponents = () => {
    return items.map(({ icon, action }, index) => {
      return (
        <TouchableOpacity
          style={[styles.item, index === 1 ? styles.middle : null]}
          key={index}
          onPress={action}>
          <SvgUri width="32" height="32" source={icon} />
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>Or continue with your other accounts</Text>
      <View style={styles.list}>{itemsComponents()}</View>
    </View>
  );
}

export default OtherLogs;
