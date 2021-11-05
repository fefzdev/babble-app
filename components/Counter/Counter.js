import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {globalStyle} from '../../assets/style/style';

function Counter() {
  const [containerColor, setContainerColor] = useState('aliceblue');
  const [nbClick, setNbClick] = useState(0);

  return (
    <View style={[styles.container, {backgroundColor: containerColor}]}>
      <View>
        <Text style={globalStyle.h1}>{nbClick}</Text>
      </View>
      <View
        onTouchStart={() => setNbClick(nbClick + 1)}
        style={styles.container2}>
        <Text style={styles.title}>Click!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  container2: {
    flex: 0,
    marginTop: 30,
    backgroundColor: 'lightgrey',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default Counter;
