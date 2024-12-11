import React, {useMemo} from 'react';
import {ActivityIndicator, Text, useColorScheme, View} from 'react-native';

import {useLocation} from '@hooks/useLocation.ts';
import {useLocationWeatherGetQuery} from '@services/api/WeatherApi';
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
          testID="user-location-loading"
        />
      );
    }

    if (locationQueryError) {
      return (
        <Text style={styles.errorText} testID="user-location-error">
          Failed to load weather data: {String(locationQueryError)}
        </Text>
      );
    }

    if (!locationQueryData) {
      return (
        <Text style={styles.noDataText} testID="user-location-empty">
          No weather data available for your location
        </Text>
      );
    }

    return (
      <View style={styles.locationContainer} testID="user-location-data">
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
