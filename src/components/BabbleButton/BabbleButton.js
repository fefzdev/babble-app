import colors from 'app/assets/style/colors';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

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
