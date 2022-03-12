import colors from 'app/assets/style/colors';
import fonts from 'app/assets/style/fonts';
import UserImage from 'app/components/UserImage';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
      height: 64,
      width: 64,
      borderRadius: 32,
    },
    title: {
      ...fonts.title,
    },
    rightBlock: {
      height: 64,
      width: 64,
    },
    profile: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.orange[200],
      borderRadius: 32,
      borderWidth: 2,
      borderColor: colors.orange[1000],
    },
    image: {
      width: '100%',
      height: '100%',
    },
    imageRadius: {
      borderRadius: 32,
    },
  });

  const { route, navigation, options } = headerProps;
  useEffect(() => {
    navigation.setOptions({ headerTitle: route.name });
  }, []);

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

  const rightButton = () => {
    if (route.name !== 'Home') return null;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Account')}
        style={styles.profile}>
        <UserImage
          style={styles.image}
          imageStyle={styles.imageRadius}
          image={profilePicture}
        />
      </TouchableOpacity>
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
        <Text style={styles.title}>{options.headerTitle}</Text>
        <View style={styles.rightBlock}>{rightButton()}</View>
      </View>
    </View>
  );
}

export default Header;
