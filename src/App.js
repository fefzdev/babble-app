import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';

import BabbleErrorPopin from './components/BabbleErrorPopin/BabbleErrorPopin';
import Auth from './modules/Auth';
import RouteBinding from './routes/RouteBinding';
import store from './store';

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
