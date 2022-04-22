import colors from 'app/assets/style/colors';
import font from 'app/assets/style/fonts';
import Background from 'app/components/Background';
import Role from 'app/components/RoleBlock';
import useRepository from 'app/database/Model';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

import ListenerMessages from './components/ListenerMessages';

function ListenerHome({ navigation }) {
  const styles = StyleSheet.create({
    loader: {
      flex: 1,
      width: '100%',
      height: '100%',
    },

    availableBloc: {
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

    messageBloc: {
      height: '40%',
      marginTop: 16,
      marginBottom: 32,
    },
  });

  const fakeData = [
    {
      name: 'Benoit',
      message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      name: 'Felix',
      message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      name: 'Bastien',
      message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      name: 'Guillaume',
      message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
  ];
  const { uid, available } = useSelector(state => state.user);
  const { userRepository } = useRepository();
  const [isEnabled, setIsEnabled] = useState(available);
  const [inputValue, setInputValue] = useState('');
  const [listernerMessagesArray, setListenerMessagesArray] = useState(fakeData);

  useEffect(() => {
    console.log(inputValue);

    setListenerMessagesArray(
      fakeData.filter(({ name }) => inputValue.includes(name)),
    );
  }, [inputValue]);

  useEffect(() => {
    if (!listernerMessagesArray.length) {
      setListenerMessagesArray(fakeData);
    }
  }, [listernerMessagesArray]);

  useEffect(() => {
    userRepository.updateData(uid, { available: isEnabled });
  }, [isEnabled]);

  const toggleSwitch = e => {
    setIsEnabled(!isEnabled);
  };

  const renderListenerMessages = () => {
    return listernerMessagesArray.map(({ name, message }) => (
      <ListenerMessages user={name} message={message} />
    ));
  };

  return (
    <Background noScroll>
      <Role />
      <View style={styles.availableBloc}>
        <Text style={font.callout}>Êtes-vous disponible ?</Text>
        <Switch
          trackColor={{ false: colors.orange[50], true: colors.orange[400] }}
          thumbColor={colors.orange[1000]}
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
      <ScrollView style={styles.messageBloc}>
        {renderListenerMessages()}
      </ScrollView>
    </Background>
  );
}

export default ListenerHome;
