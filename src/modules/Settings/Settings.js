import Icon from '@expo/vector-icons/Entypo';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import Background from '@/components/Background';
import UserImage from '@/components/UserImage';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

import SettingsBlock from './components/SettingsBlock';
import useSettings from './data';

function Settings({ navigation }) {
  const { settingsList, onSignOut, onAccountDeleteOut } = useSettings();
  const { profilePicture, mail, name } = useSelector(state => state.user);

  const handlerFunction = {
    setRoleModalVisible: () => navigation.navigate('Role'),
    setNotifsModalVisible: () => navigation.navigate('Notifications'),
    signOut: () => onSignOut(),
    accountDelete: () => onAccountDeleteOut(),
  };

  return (
    <Background style={styles.container} noScroll>
      <TouchableOpacity
        style={[styles.settingsBlock, styles.accountBlock]}
        onPress={() => navigation.navigate('Compte')}>
        <UserImage image={profilePicture} imageStyle={styles.image} size={64} />
        <View style={styles.profileContent}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{mail}</Text>
        </View>
        <Icon name="chevron-right" size={24} color={Colors.orange[1000]} />
      </TouchableOpacity>
      {settingsList.map((group, id) => (
        <View style={styles.settingsBlock} key={id}>
          {group.map(({ text, icon, handle: { fn, prm } }) => (
            <SettingsBlock
              text={text}
              icon={icon}
              key={text}
              onPress={() => handlerFunction[fn](...prm)}
            />
          ))}
        </View>
      ))}
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    justifyContent: 'flex-start',
  },
  settingTitle: {
    marginBottom: 8,
    fontSize: 16,
    padding: 8,
    paddingBottom: 0,
    color: Colors.orange[1000],
  },
  settingsBlock: {
    marginTop: 16,
    width: '100%',
    backgroundColor: Colors.orange[200],
    borderRadius: 8,
  },
  accountBlock: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContent: {
    marginLeft: 12,
    flexGrow: 1,
  },
  name: {
    ...Fonts.title,
    fontWeight: 'normal',
    marginBottom: 4,
    color: Colors.orange[1000],
  },
  email: {
    color: Colors.orange[800],
  },
  settingContainer: {
    marginBottom: 20,
  },
});

export default Settings;
