import type {RootStackParamList} from './RootNavigatorParamList';

import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LocationListScreen from '../screens/locationList/LocationListScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>({
  initialRouteName: 'LocationList',
  screenOptions: {
    headerTintColor: 'black',
    headerStyle: {
      backgroundColor: '#d5d5d5',
    },
  },
  screens: {
    LocationList: {
      screen: LocationListScreen,
      options: {
        title: 'Weather',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);
