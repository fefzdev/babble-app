import { StyleSheet } from 'react-native';

import Background from '@/components/Background';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

import SettingsList from './components/SettingsList';
import UserSettingItem from './components/UserSettingItem';
import useSettings from './hooks/useSettings';

function Settings({ navigation }) {
  const { settingsList } = useSettings(navigation);

  return (
    <Background style={styles.container} noScroll>
      <UserSettingItem onPress={() => navigation.navigate('Compte')} />
      {settingsList.map((group, id) => (
        <SettingsList list={group} key={id} />
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
  settingsList: {
    marginTop: 16,
    width: '100%',
    backgroundColor: 'white',
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
