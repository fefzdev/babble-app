import { NavigationContainer } from '@react-navigation/native';
import BabbleErrorPopin from 'app/components/BabbleErrorPopin/BabbleErrorPopin';
import Auth from 'app/modules/Auth';
import RouteBinding from 'app/routes/RouteBinding';
import store from 'app/store';
import React from 'react';
import { Provider } from 'react-redux';

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
