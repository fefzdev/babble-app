import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Colors from '@/constants/Colors';

export default function BabbleButton({ children, onPress, style }) {
  const [isPressed, setIsPressed] = React.useState(false);

  const buttonStyle = {
    backgroundColor: isPressed ? Colors.orange[700] : Colors.orange[1000],
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    color: Colors.white,
  };
  const textStyle = {
    color: Colors.white,
    fontSize: 16,
  };

  const handlePress = () => {
    return buttonStyle;
  };

  const handlePressOut = () => {
    onPress();
    setIsPressed(false);
  };

  return (
    <TouchableOpacity
      style={{ ...handlePress(), ...style }}
      activeOpacity={1}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => handlePressOut()}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
}
