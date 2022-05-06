import colors from 'app/assets/style/colors';
import fonts from 'app/assets/style/fonts';
import BabbleButton from 'app/components/BabbleButton/BabbleButton';
import Background from 'app/components/Background';
import useRepository from 'app/database/Model';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import RoleModal from './components/RoleModal.js';

function FirstLogin() {
  const [modalVisible, setModalVisible] = useState(false);
  const userUID = useSelector(state => state.user.uid);
  const { userRepository } = useRepository();

  const onSubmit = type => {
    setModalVisible(false);
    userRepository.updateData(userUID, {
      type,
    });
  };

  const styles = {
    image: {
      height: 200,
      width: 300,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    container: {
      paddingHorizontal: 24,
      flex: 1,
      justifyContent: 'center',
    },
    content: {
      marginTop: 32,
      alignItems: 'center',
    },
    title: {},
    description: {
      marginTop: 8,
      color: colors.black[600],
      fontSize: 16,
      textAlign: 'center',
    },
    button: {
      marginTop: 32,
    },
    modal: {
      backgroundColor: colors.black[600],
      width: '100%',
      top: 128,
      height: '100%',
    },
  };

  return (
    <Background style={styles.container} noScroll>
      <Image
        style={styles.image}
        source={require('app/assets/images/home-first-connection.png')}
      />
      <View style={styles.content}>
        <Text style={[styles.title, fonts.callout]}>Welcome to Babbles!</Text>
        <Text style={styles.description}>
          Here you’ll find all your conversation with others. Start a chat a
          interact with people in a safe place.
        </Text>
      </View>
      <BabbleButton style={styles.button} onPress={() => setModalVisible(true)}>
        Start your first chat!
      </BabbleButton>
      <RoleModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={onSubmit}
      />
    </Background>
  );
}

export default FirstLogin;
