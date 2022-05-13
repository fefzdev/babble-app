import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '@/constants/Colors';
import { removeErrorMessage } from '@/store/App';

export default function BabbleErrorPopin() {
  const { errorMessage } = useSelector(state => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorMessage) {
      console.warn(errorMessage);
      setTimeout(() => dispatch(removeErrorMessage()), 3000);
    }
  }, [errorMessage]);

  const styles = StyleSheet.create({
    popinContainer: {
      position: 'absolute',
      bottom: 48,
      width: '100%',
    },
    container: {
      backgroundColor: Colors.red[300],
      marginHorizontal: 20,
      borderRadius: 8,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    text: {
      color: Colors.red[1000],
      flex: 1,
    },
    icon: {
      color: Colors.red[1000],
    },
  });
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
          fill={Colors.red[1000]}
          source={require('../../assets/icons/Cross.svg')}
        />
      </TouchableOpacity>
    </View>
  );
}
