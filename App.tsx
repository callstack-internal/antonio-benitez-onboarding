import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Navigation} from '@navigation/RootNavigator.tsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  </QueryClientProvider>
);

export default App;
