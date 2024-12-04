import {SafeAreaView, ScrollView, View} from 'react-native';
import React, {useMemo} from 'react';

import {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '@navigation/RootNavigatorParamList.js';
import {WeatherItem} from '@components/WeatherItem/WeatherItem.tsx';

import {Section} from './parts/Section/Section';
import {styles} from './LocationDetailsScreen.styles.ts';

type LocationDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'LocationDetails'
>;

const LocationDetailsScreen = ({
  route,
}: {
  route: LocationDetailsScreenRouteProp;
}) => {
  const {cityWeather} = route.params;
  const sectionContent = useMemo(() => {
    const {main, wind, clouds} = cityWeather;

    return {
      humidity: `${main.humidity}%`,
      pressure: `${main.pressure} hPa`,
      windSpeed: `${wind.speed} mph`,
      cloudCover: `${clouds.all}%`,
      minTemp: `${main.temp_min} ºF`,
      maxTemp: `${main.temp_max} ºF`,
    };
  }, [cityWeather]);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.weatherItemContainer}>
          <WeatherItem item={cityWeather} />
        </View>
        <Section title="Humidity" content={sectionContent.humidity} />
        <Section title="Pressure" content={sectionContent.pressure} />
        <Section title="Wind Speed" content={sectionContent.windSpeed} />
        <Section title="Cloud Cover" content={sectionContent.cloudCover} />
        <Section title="Min. Temperature" content={sectionContent.minTemp} />
        <Section title="Max. Temperature" content={sectionContent.maxTemp} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LocationDetailsScreen;
