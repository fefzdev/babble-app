import { StyleSheet, View } from 'react-native';

import SettingItem from './SettingItem';

export default function SettingsList({ style, list }) {
  return (
    <View style={[styles.container, style]}>
      {list.map(({ text, icon, action }) => (
        <SettingItem text={text} icon={icon} key={text} onPress={action} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
  },
});
