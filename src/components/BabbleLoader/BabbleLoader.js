import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import Colors from '@/constants/Colors';

export default function BabbleLoader({ style }) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const rotate = () => {
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(({ finished }) => {
      if (finished) {
        rotateAnim.setValue(0);
        rotate();
      }
    });
  };

  const interpolateRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => rotate(), []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    loader: {
      borderRadius: 24,
      borderWidth: 4,
      borderBottomColor: 'transparent',
      borderColor: Colors.orange[1000],
      width: 48,
      height: 48,
    },
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[styles.loader, { transform: [{ rotate: interpolateRotate }] }]}
      />
    </View>
  );
}
