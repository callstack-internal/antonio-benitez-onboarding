import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import React from 'react';

import {useGroupWeatherGetQuery} from '@services/api/WeatherApi';

import {styles} from './LocationListScreen.styles';
import {WeatherItem} from './parts/WeatherItem/WeatherItem.tsx';

const CITY_IDS = [
  703448, // Kyiv, UA
  692194, // Sumy, UA
  756135, // Warsaw, PL
  3081368, // Wrocław, PL
  3067696, // Prague, CZ
  3077916, // České Budějovice, CZ
  2950159, // Berlin, DE
  2867714, // Munich, DE
  3247449, // Aachen, DE
  5815135, // Washington, US
  5128581, // New York City, US
];

const LocationListScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const {data, error, isLoading} = useGroupWeatherGetQuery(CITY_IDS);

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? styles.backgroundStyleDark
      : styles.backgroundStyleLight,
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          backgroundStyle.backgroundColor.backgroundColor,
        ]}>
        <ActivityIndicator size="large" color={isDarkMode ? '#FFF' : '#000'} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          backgroundStyle.backgroundColor.backgroundColor,
        ]}>
        <Text style={styles.errorText}>
          Failed to load weather data: {String(error)}
        </Text>
      </SafeAreaView>
    );
  }

  if (!data || data?.list.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor.backgroundColor}
        />
        <Text style={{textAlign: 'center'}}>No weather data available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor.backgroundColor}
      />

      <FlatList
        data={data.list}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <WeatherItem key={item.id} item={item} />}
      />
    </SafeAreaView>
  );
};

export default LocationListScreen;
