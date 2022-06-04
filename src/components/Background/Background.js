import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '@/constants/Colors';

function Background({ children, style, noScroll }) {
  const styles = StyleSheet.create({
    containerStyle: {
      backgroundColor: Colors.orange[50],
      flex: 1,
      paddingHorizontal: 20,
    },
  });

  if (noScroll)
    return <View style={[styles.containerStyle, style]}>{children}</View>;

  return (
    <KeyboardAwareScrollView
      keyboardOpeningTime={0}
      style={[styles.containerStyle, style]}>
      {children}
    </KeyboardAwareScrollView>
  );
}

export default Background;
