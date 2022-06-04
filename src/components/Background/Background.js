import { ScrollView, View } from 'react-native';

import Colors from '@/constants/Colors';

function Background({ children, style, noScroll }) {
  const containerStyle = {
    backgroundColor: Colors.orange[50],
    flex: 1,
    paddingHorizontal: 20,
  };

  if (noScroll) return <View style={[containerStyle, style]}>{children}</View>;

  return <ScrollView style={[containerStyle, style]}>{children}</ScrollView>;
}

export default Background;
