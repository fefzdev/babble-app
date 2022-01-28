module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react-hooks/exhaustive-deps': 'off',
    curly: ['off'],
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          app: './src/',
        },
      },
    },
  },
};
