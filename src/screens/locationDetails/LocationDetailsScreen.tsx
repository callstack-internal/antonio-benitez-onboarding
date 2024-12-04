import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import React from 'react';

import {Section} from './parts/Section/Section';
import {styles} from './LocationDetailsScreen.styles.ts';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '@navigation/RootNavigatorParamList.js';
import {WeatherItem} from '@components/WeatherItem/WeatherItem.tsx';

type LocationDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'LocationDetails'
>;

const LocationDetailsScreen = ({
  route,
}: {
  route: LocationDetailsScreenRouteProp;
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const {cityWeather} = route.params;

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? styles.backgroundStyleDark
      : styles.backgroundStyleLight,
  };

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <WeatherItem item={cityWeather} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LocationDetailsScreen;
