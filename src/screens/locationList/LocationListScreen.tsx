import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  FlatList,
  ActivityIndicator,
  Text,
  ListRenderItem,
} from 'react-native';
import React, {useCallback, useMemo} from 'react';

import {useGroupWeatherGetQuery} from '@services/api/WeatherApi';
import {CITY_IDS} from '@mocks/const/WeatherAPI.ts';
import {CityWeather} from '@services/api/WeatherApi/types';

import {TouchableWeatherItem} from './parts/TouchableWeatherItem/TouchableWeatherItem';
import {styles} from './LocationListScreen.styles';

const LocationListScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const {data, error, isLoading} = useGroupWeatherGetQuery(CITY_IDS);

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? styles.backgroundStyleDark
      : styles.backgroundStyleLight,
  };

  const renderItem: ListRenderItem<CityWeather> = useCallback(
    ({item}) => <TouchableWeatherItem key={item.id} item={item} />,
    [],
  );

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <ActivityIndicator
          size="large"
          color={isDarkMode ? '#FFF' : '#000'}
          testID="location-list-loading"
        />
      );
    }

    if (error) {
      return (
        <Text style={styles.errorText} testID="location-list-error">
          Failed to load weather data: {String(error)}
        </Text>
      );
    }

    if (!data || data?.list.length === 0) {
      return (
        <Text style={styles.noDataText} testID="location-list-empty">
          No weather data available
        </Text>
      );
    }

    return (
      <FlatList
        data={data.list}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        testID="location-list-data"
      />
    );
  }, [data, error, isDarkMode, isLoading, renderItem]);

  return (
    <SafeAreaView style={styles.safeAreaView} testID="location-list-screen">
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor.backgroundColor}
      />
      {content}
    </SafeAreaView>
  );
};

export default LocationListScreen;
