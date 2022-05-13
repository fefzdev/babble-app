module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  plugins: ['simple-import-sort', 'autofix'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/react-in-jsx-scope': 'off',
    'autofix/no-unused-vars': 'error',
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
