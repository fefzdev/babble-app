import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import colors from '../../assets/style/colors';

export default function BabbleButton({ children, onPress, style }) {
  const [isPressed, setIsPressed] = React.useState(false);

  const buttonStyle = {
    backgroundColor: isPressed ? colors.orange[700] : colors.orange[1000],
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    color: colors.white,
  };
  const textStyle = {
    color: colors.white,
  };

  const handlePress = () => {
    // if (isPressed) {
    //   return buttonStylePressed;
    // }
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
      onPressOut={() => handlePressOut()}
    >
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
}
