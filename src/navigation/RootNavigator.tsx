import type {RootStackParamList} from './RootNavigatorParamList';

import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LocationListScreen from '../screens/locationList/LocationListScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>({
  initialRouteName: 'LocationList',
  screens: {
    LocationList: LocationListScreen,
  },
});

export const Navigation = createStaticNavigation(RootStack);
