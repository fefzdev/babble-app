import {StyleSheet} from 'react-native';

const globalStyle = StyleSheet.create({
  h1: {
    fontWeight: 'bold',
    fontSize: 150,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const globalMixin = {
  pageBgColor: 'aliceblue',
};

export {globalStyle, globalMixin};
