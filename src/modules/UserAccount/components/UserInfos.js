import Icon from '@expo/vector-icons/Entypo';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import Colors from '@/constants/Colors';

import Email from './Email';
import NameEditModal from './NameEditModal';
import PasswordEditModal from './PasswordEditModal';

export default function UserInfos({ style }) {
  const { name } = useSelector(state => state.user);
  const [isNamePopupDisplayed, setNamePopupDisplayed] = useState(false);
  const [isPasswordPopupDisplayed, setPasswordPopupDisplayed] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <Email />
      <View style={[styles.settingsBlock]}>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setNamePopupDisplayed(true)}>
          <Icon
            style={styles.icon}
            name="user"
            size={24}
            color={Colors.orange[1000]}
          />
          <View style={styles.content}>
            <Text style={styles.text}>{name}</Text>
            <Icon name="chevron-right" size={24} color={Colors.orange[1000]} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setPasswordPopupDisplayed(true)}>
          <Icon
            style={styles.icon}
            name="key"
            size={24}
            color={Colors.orange[1000]}
          />
          <View style={[styles.content, styles.contentNoBorder]}>
            <Text style={styles.text}>••••••••••••••</Text>
            <Icon name="chevron-right" size={24} color={Colors.orange[1000]} />
          </View>
        </TouchableOpacity>
      </View>
      <NameEditModal
        isDisplayed={isNamePopupDisplayed}
        onClose={() => setNamePopupDisplayed(false)}
      />
      <PasswordEditModal
        isDisplayed={isPasswordPopupDisplayed}
        onClose={() => setPasswordPopupDisplayed(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  settingsBlock: {
    marginTop: 16,
    flex: 1,
    width: '100%',
    backgroundColor: Colors.orange[200],
    borderRadius: 8,
  },
  settingItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
  },
  icon: {
    marginRight: 16,
  },
  text: {
    fontSize: 18,
    color: Colors.orange[900],
  },
  content: {
    paddingVertical: 12,
    paddingRight: 16,
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.orange[100],
  },
  contentNoBorder: {
    borderBottomWidth: 0,
  },
});
