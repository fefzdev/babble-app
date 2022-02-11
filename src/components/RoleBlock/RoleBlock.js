import colors from 'app/assets/style/colors';
import fonts from 'app/assets/style/fonts';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

function Role() {
  const currentUserType = useSelector(state => state.user.type);

  const style = StyleSheet.create({
    view: {
      padding: 24,
      borderRadius: 8,
      backgroundColor: colors.orange['200'],
    },
    text: {
      textAlign: 'center',
      fontSize: 24,
    },
  });

  return (
    <View style={style.view}>
      <Text
        style={[
          style.text,
          fonts.callout,
        ]}>{`Vous êtes connecté en tant que ${currentUserType}`}</Text>
    </View>
  );
}

export default Role;
