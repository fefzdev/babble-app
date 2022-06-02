import '@/database/firebase';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import BabbleErrorPopin from './src/components/BabbleErrorPopin';
import BabbleInfoPopin from './src/components/BabbleInfoPopin';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import store from './src/store';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar style={'dark'} />
          <Navigation colorScheme={colorScheme} />
          <BabbleErrorPopin />
          <BabbleInfoPopin />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
