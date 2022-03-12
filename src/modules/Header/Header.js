import colors from 'app/assets/style/colors';
import fonts from 'app/assets/style/fonts';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { useSelector } from 'react-redux';

function Header({ headerProps }) {
  const settingsIcon = require('app/assets/icons/Settings.svg');
  const goBackIcon = require('app/assets/icons/ArrowLeft.svg');

  const { profilePicture } = useSelector(state => state.user);

  const styles = StyleSheet.create({
    container: {
      height: 124,
      backgroundColor: colors.orange[100],
      paddingTop: 44,
      paddingHorizontal: 16,
    },
    inner: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
    },
    leftButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.orange[200],
      padding: 8,
      height: 48,
      width: 48,
      borderRadius: 32,
    },
    title: {
      ...fonts.title,
    },
    rightBlock: {
      height: 44,
      width: 44,
    },
    profile: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.orange[200],
      borderRadius: 32,
      borderWidth: 2,
      borderColor: colors.orange[1000],
    },
    profileTouchable: {
      overflow: 'hidden',
      width: '100%',
      height: '100%',
    },
    image: {
      width: '100%',
      height: '100%',
    },
  });

  const { route, navigation } = headerProps;

  const leftButtonContent = () => {
    if (navigation.canGoBack())
      return {
        action: () => navigation.goBack(),
        icon: goBackIcon,
      };
    return {
      action: () => navigation.navigate('Settings'),
      icon: settingsIcon,
    };
  };

  const displayProfilePicture = () => {
    if (profilePicture) return profilePicture;
    return require('app/assets/images/profile-placeholder.png');
  };

  const rightButton = () => {
    if (route.name !== 'Home') return null;
    return (
      <View style={styles.profile} removeClippedSubviews={true}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Account')}
          style={styles.profileTouchable}>
          <Image style={styles.image} source={displayProfilePicture()} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={leftButtonContent().action}>
          <SvgUri
            width="24"
            height="24"
            fill={colors.orange[1000]}
            source={leftButtonContent().icon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{route.name}</Text>
        <View style={styles.rightBlock}>{rightButton()}</View>
      </View>
    </View>
  );
}

export default Header;
