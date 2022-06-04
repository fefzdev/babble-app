import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import SettingsList from '@/components/SettingsList';
import Colors from '@/constants/Colors';

import Email from './Email';
import NameEditModal from './NameEditModal';
import PasswordEditModal from './PasswordEditModal';

export default function UserInfos({ style }) {
  const { name } = useSelector(state => state.user);
  const [isNamePopupDisplayed, setNamePopupDisplayed] = useState(false);
  const [isPasswordPopupDisplayed, setPasswordPopupDisplayed] = useState(false);
  const settingsList = [
    {
      icon: 'user',
      text: name,
      action: () => setNamePopupDisplayed(true),
    },
    {
      icon: 'key',
      text: '••••••••••••••',
      action: () => setPasswordPopupDisplayed(true),
    },
  ];
  return (
    <View style={[styles.container, style]}>
      <Email />
      <SettingsList list={settingsList} />
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
    width: '100%',
  },
  SettingItem: {
    marginTop: 16,
    width: '100%',
    backgroundColor: Colors.orange[200],
    borderRadius: 8,
  },
  settingItem: {
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
