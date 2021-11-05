import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RouteBinding from './routes/RouteBinding';

function App() {
  return (
    <NavigationContainer>
      <RouteBinding />
    </NavigationContainer>
  );
}

export default App;
