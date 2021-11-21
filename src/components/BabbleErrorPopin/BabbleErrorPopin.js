import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../assets/style/colors';
import { removeErrorMessage } from '../../store/App';

export default () => {
  const { errorMessage } = useSelector(state => state.app);
  const dispatch = useDispatch();

  const styles = {
    popinContainer: {
      position: 'absolute',
      bottom: 48,
      width: '100%',
    },
    container: {
      backgroundColor: colors.red[300],
      marginHorizontal: 20,
      borderRadius: 8,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    text: {
      color: colors.red[1000],
      flex: 1,
    },
    icon: {
      color: colors.red[1000],
    },
  };
  if (!errorMessage) {
    return null;
  }
  return (
    <View style={styles.popinContainer}>
      <TouchableOpacity
        onPress={() => dispatch(removeErrorMessage())}
        style={styles.container}>
        <Text style={styles.text}> {errorMessage}</Text>
        <SvgUri
          width="24"
          height="24"
          style={styles.icon}
          fill={colors.red[1000]}
          source={require('../../assets/icons/Cross.svg')}
        />
      </TouchableOpacity>
    </View>
  );
};
