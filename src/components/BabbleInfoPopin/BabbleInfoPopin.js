import Icon from '@expo/vector-icons/Entypo';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '@/constants/Colors';
import { removeInfoMessage } from '@/store/App';

export default function BabbleInfoPopin() {
  const { infoMessage } = useSelector(state => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    if (infoMessage) setTimeout(() => dispatch(removeInfoMessage()), 3000);
  }, [infoMessage]);

  if (!infoMessage) return null;

  return (
    <View style={styles.popinContainer}>
      <TouchableOpacity
        onPress={() => dispatch(removeInfoMessage())}
        style={styles.container}>
        <Text style={styles.text}> {infoMessage}</Text>
        <Icon name="cross" size={24} color={Colors.orange[1000]} />
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
    backgroundColor: Colors.orange[300],
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: Colors.orange[1000],
    flex: 1,
  },
});
