import React, {useMemo} from 'react';
import {ActivityIndicator, Text, useColorScheme, View} from 'react-native';

import {useLocation} from '@hooks/useLocation.ts';
import {useLocationWeatherGetQuery} from '@services/api/WeatherApi/queries/useLocationWeatherGetQuery/useLocationWeatherGetQuery.ts';
import {TouchableWeatherItem} from '@screens/locationList/parts/TouchableWeatherItem/TouchableWeatherItem.tsx';

import {styles} from './UserLocationWeather.style.ts';

const UserLocationWeather: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {location} = useLocation();

  const {
    data: locationQueryData,
    error: locationQueryError,
    isLoading: locationQueryIsLoading,
  } = useLocationWeatherGetQuery(location);

  return useMemo(() => {
    if (locationQueryIsLoading) {
      return (
        <ActivityIndicator
          size="large"
          color={isDarkMode ? '#FFF' : '#000'}
          testID="location-list-loading"
        />
      );
    }

    if (locationQueryError) {
      return (
        <Text style={styles.errorText} testID="location-list-error">
          Failed to load weather data: {String(locationQueryError)}
        </Text>
      );
    }

    if (!locationQueryData) {
      return (
        <Text style={styles.noDataText} testID="location-list-empty">
          No weather data available for your location
        </Text>
      );
    }

    return (
      <View style={styles.locationContainer}>
        <Text style={styles.locationTitle}>Weather at your location</Text>
        <TouchableWeatherItem
          key={locationQueryData.id}
          item={locationQueryData}
        />
      </View>
    );
  }, [
    isDarkMode,
    locationQueryData,
    locationQueryIsLoading,
    locationQueryError,
  ]);
};

export {UserLocationWeather};
