import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

function Role() {
  const currentUserType = useSelector(state => state.user.type);

  const style = StyleSheet.create({
    view: {
      padding: 24,
      borderRadius: 8,
      backgroundColor: Colors.orange['200'],
      width: '100%',
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
          Fonts.callout,
        ]}>{`Vous êtes connecté en tant que ${currentUserType}`}</Text>
    </View>
  );
}

export default Role;
