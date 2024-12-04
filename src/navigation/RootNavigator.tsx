import type {RootStackParamList} from './RootNavigatorParamList';

import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LocationListScreen from '@screens/locationList/LocationListScreen';
import LocationDetailsScreen from '@screens/locationDetails/LocationDetailsScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>({
  initialRouteName: 'LocationList',
  screenOptions: {
    headerTintColor: 'black',
    headerStyle: {
      backgroundColor: '#d5d5d5',
    },
    headerTitleAlign: 'center',
  },
  screens: {
    LocationList: {
      screen: LocationListScreen,
      options: {
        title: 'Weather',
      },
    },
    LocationDetails: {
      screen: LocationDetailsScreen,
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);
