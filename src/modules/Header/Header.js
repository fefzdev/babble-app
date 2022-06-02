import Icon from '@expo/vector-icons/Entypo';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import UserImage from '@/components/UserImage';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

export default function Header({ headerProps }) {
  const { profilePicture } = useSelector(state => state.user);

  const { route, navigation, options } = headerProps;

  useEffect(() => {
    navigation.setOptions({ headerTitle: route.name });
  }, []);

  const leftButtonContent = () => {
    if (navigation.canGoBack())
      return {
        action: () => navigation.goBack(),
        component: (
          <Icon size={24} color={Colors.orange[1000]} name="chevron-left" />
        ),
      };
    return {
      action: () => navigation.navigate('Settings'),
      component: settings(),
    };
  };

  const settings = () => {
    return (
      <View style={[styles.rightBlock, styles.settings]}>
        <UserImage
          style={styles.image}
          imageStyle={styles.imageRadius}
          image={profilePicture}
        />
        <View style={styles.icon}>
          <Icon size={20} color={Colors.orange[1000]} name="cog" />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={leftButtonContent().action}>
          {leftButtonContent().component}
        </TouchableOpacity>
        <Text style={styles.title}>{options.headerTitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 124,
    backgroundColor: Colors.orange[100],
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
    backgroundColor: Colors.orange[200],
    padding: 8,
    height: 54,
    width: 54,
    borderRadius: 32,
  },
  title: {
    ...Fonts.title,
    position: 'absolute',
    width: 300,
    textAlign: 'center',
    left: '50%',
    transform: [{ translateX: -150 }],
    zIndex: -1,
  },
  rightBlock: {
    height: 54,
    width: 54,
  },
  settings: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.orange[200],
    borderRadius: 32,
    borderWidth: 2,
    borderColor: Colors.orange[1000],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageRadius: {
    borderRadius: 32,
  },
  icon: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    padding: 2,
    backgroundColor: Colors.orange[100],
    borderRadius: 32,
  },
});
