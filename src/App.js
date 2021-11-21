import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import RouteBinding from './routes/RouteBinding';
import Auth from './modules/Auth';
import BabbleErrorPopin from './components/BabbleErrorPopin/BabbleErrorPopin';

function App() {
  return (
    <Provider store={store}>
      <Auth>
        <NavigationContainer>
          <RouteBinding />
        </NavigationContainer>
      </Auth>
      <BabbleErrorPopin />
    </Provider>
  );
}

export default App;
