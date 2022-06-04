import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import Colors from '@/constants/Colors';

export default function BabbleInput({
  label,
  value,
  onChangeText,
  placeholder,
  style,
  error,
  ...attr
}) {
  const [isFocused, setIsFocused] = useState(false);

  const styles = StyleSheet.create({
    input: {
      borderWidth: 2,
      borderColor: Colors.orange[500],
      padding: 16,
      borderRadius: 8,
    },

    inputFocused: {
      borderColor: Colors.orange[1000],
    },

    inputError: {
      borderColor: Colors.red[1000],
      color: Colors.red[500],
    },

    label: {
      marginBottom: 8,
    },
    labelError: {
      color: Colors.red[500],
    },
    container: {
      flex: 1,
    },
  });

  const handleStyle = () => {
    if (isFocused) {
      return [styles.input, styles.inputFocused];
    }
    if (error) {
      return [styles.input, styles.inputError];
    }
    return styles.input;
  };
  const handleLabelStyle = () => {
    if (error) {
      return [styles.label, styles.labelError];
    }
    return styles.label;
  };

  return (
    <View style={style}>
      <Text style={handleLabelStyle()}>{label}</Text>
      <TextInput
        style={handleStyle()}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChangeText={text => onChangeText(text)}
        placeholder={placeholder}
        {...attr}
      />
    </View>
  );
}
