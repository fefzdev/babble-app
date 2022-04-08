import React, { useEffect } from 'react';
import { Text } from 'react-native';

export default function Room({ route, navigation }) {
  useEffect(() => {
    navigation.setOptions({ headerTitle: route.params.userId });
  }, []);
  return <Text>{route.params.userId}</Text>;
}
