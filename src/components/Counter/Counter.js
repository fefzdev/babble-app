import { globalStyle } from 'app/assets/style/style';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Counter() {
  const [nbClick, setNbClick] = useState(0);

  return (
    <View style={styles.container}>
      <View>
        <Text style={globalStyle.h1}>{nbClick}</Text>
      </View>
      <View
        onTouchStart={() => setNbClick(nbClick + 1)}
        style={globalStyle.button}>
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
