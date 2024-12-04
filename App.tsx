import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Navigation} from './src/navigation/RootNavigator.tsx';

const App: React.FC = () => (
  <SafeAreaProvider>
    <Navigation />
  </SafeAreaProvider>
);

export default App;
