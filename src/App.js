import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import store from './store';
import {Provider} from 'react-redux';
import RouteBinding from './routes/RouteBinding';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RouteBinding />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
