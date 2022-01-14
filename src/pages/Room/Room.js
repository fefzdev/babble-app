import React from 'react';
import { Text } from 'react-native';

export default function Room({ navigation, roomId = 0 }) {
  return <Text>{roomId}</Text>;
}
