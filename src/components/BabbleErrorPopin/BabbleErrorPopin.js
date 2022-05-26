import Icon from '@expo/vector-icons/Entypo';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

  if (!errorMessage) {
    return null;
  }
  return (
    <View style={styles.popinContainer}>
      <TouchableOpacity
        onPress={() => dispatch(removeErrorMessage())}
        style={styles.container}>
        <Text style={styles.text}> {errorMessage}</Text>
        <Icon name="cross" size={24} color={Colors.red[1000]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  popinContainer: {
    position: 'absolute',
    top: 100,
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
