import React from 'react';
import { TextInput, View, Text } from 'react-native';
import colors from '../../assets/style/colors';

export default function BabbleInput({
  label,
  value,
  onChangeText,
  placeholder,
  style,
}) {
  const [isFocused, setIsFocused] = React.useState(false);

  const inputStyle = {
    borderWidth: 2,
    borderColor: colors.orange[500],
    padding: 16,
    borderRadius: 8,
  };

  const inputStyleFocused = {
    borderWidth: 2,
    borderColor: colors.orange[1000],
    padding: 16,
    borderRadius: 8,
  };

  const labelStyle = {
    marginBottom: 8,
  };

  const handleFocus = () => {
    if (isFocused) {
      return inputStyleFocused;
    }
    return inputStyle;
  };

  return (
    <View style={style}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        style={handleFocus()}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChangeText={text => onChangeText(text)}
        placeholder={placeholder}
      />
    </View>
  );
}
