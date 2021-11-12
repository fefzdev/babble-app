import {StyleSheet} from 'react-native';

const globalVariable = {
  pageBgColor: 'aliceblue',
  mainColor: '#fff',
  secondColor: 'black',
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
};

const globalStyle = StyleSheet.create({
  h1: {
    fontWeight: 'bold',
    fontSize: 150,
  },

  h2: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  button: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    ...globalVariable.boxShadow,
  },

  wrapper: {
    padding: 20,
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export {globalStyle, globalVariable};
