import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const enableMocking = async () => {
  if (!__DEV__) {
    return;
  }

  try {
    console.log('Enabling mocking...');

    await import('./msw.polyfills');
    console.log('Polyfills loaded.');

    const {server} = await import('./src/mocks/server');
    console.log('Server imported');

    server.listen();

    console.log('Mocking enabled.');
  } catch (error) {
    console.error('Failed to enable mocking:', error);
  }
};

enableMocking();

AppRegistry.registerComponent(appName, () => App);
