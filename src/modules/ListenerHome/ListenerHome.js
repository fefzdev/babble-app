import { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

import Background from '@/components/Background';
import Role from '@/components/RoleBlock';
import colors from '@/constants/Colors';
import font from '@/constants/Fonts';
import useRepository from '@/database/Model';

import ListenerMessages from './components/ListenerMessages';

function ListenerHome({ navigation }) {
  const { uid, available } = useSelector(state => state.user);
  const { userRepository, roomRepository } = useRepository();
  const [isEnabled, setIsEnabled] = useState(available);
  const [inputValue, setInputValue] = useState('');
  const [allRooms, setAllRooms] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [talkersWantsToTalk, setTalkersWantsToTalk] = useState([]);
  const listernerMessagesArray = useMemo(() => {
    if (inputValue !== '') {
      return talkersWantsToTalk.filter(({ talker: { name } }) =>
        inputValue.includes(name),
      );
    }

    return talkersWantsToTalk;
  }, [inputValue]);

  useEffect(() => {
    if (allUsers.length) {
      const rtrTwantsToTalk = [];
      allRooms
        .filter(r => r.users[1] === uid)
        .forEach(r => {
          const talker = allUsers.find(u => u.uid === r.users[0]);
          rtrTwantsToTalk.push({ ...r, talker });
        });
      setTalkersWantsToTalk(rtrTwantsToTalk);
    }
  }, [allRooms]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await userRepository.all();
      setAllUsers(users);
    };
    fetchUsers();

    roomRepository.listen(data => {
      setAllRooms(data);
    });
  }, []);

  useEffect(() => {
    const updateUserAvailable = async () => {
      await userRepository.updateData(uid, { available: isEnabled });
    };
    updateUserAvailable();
  }, [isEnabled]);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  const buildTalkersWantsToTalk = () => {
    let rtrArray = talkersWantsToTalk;

    if (listernerMessagesArray.length) {
      rtrArray = listernerMessagesArray;
    }

    return rtrArray.map(
      ({
        talker: { name, uid: talkerUid, profilePicture },
        messages,
        uid: roomUid,
      }) => {
        const lastTalkerMessage = messages
          ?.filter(({ user: { uid: messageUid } }) => messageUid === talkerUid)
          .pop()?.content;

        return (
          <ListenerMessages
            key={roomUid}
            name={name}
            profilePicture={profilePicture}
            message={lastTalkerMessage ?? 'Veux discuter !'}
            onPress={() => {
              roomRepository.setActive(roomUid);
              navigation.navigate('Room', {
                roomId: roomUid,
              });
            }}
          />
        );
      },
    );
  };

  return (
    <Background noScroll>
      <Role />
      <View style={styles.availableBlock}>
        <Text style={font.callout}>Êtes-vous disponible ?</Text>
        <Switch
          trackColor={{ false: colors.orange[50], true: colors.orange[400] }}
          thumbColor={colors.orange[1000]}
          ios_backgroundColor={colors.orange[50]}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Text style={styles.convTitle}>Vos conversations</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Rechercher une conversation"
        placeholderTextColor={colors.orange[600]}
      />
      <ScrollView style={styles.messageBlock}>
        {buildTalkersWantsToTalk()}
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  availableBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 33,
  },

  convTitle: {
    ...font.title,
    marginTop: 33,
  },

  input: {
    backgroundColor: colors.orange[200],
    borderWidth: 1,
    borderColor: colors.orange[400],
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 8,
    borderRadius: 8,
    fontSize: 16,
    color: colors.orange[900],
  },

  messageBlock: {
    height: '30%',
    marginTop: 16,
    marginBottom: 32,
  },
});

export default ListenerHome;
