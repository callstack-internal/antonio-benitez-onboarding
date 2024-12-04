import type {CityWeather} from '@services/api/WeatherApi/types';

import React, {useCallback, useMemo} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {RootStackParamList} from '@navigation/RootNavigatorParamList';

import {styles} from './WeatherItem.style.ts';
import {weatherIconUriGet} from '@helpers/WeatherApi/weatherIconUriGet.ts';

type Props = {
  item: CityWeather;
};

const WeatherItem: React.FC<Props> = ({item}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleItemPress = useCallback(() => {
    navigation.navigate('LocationDetails');
  }, [navigation]);

  const weatherIcon = useMemo(
    () => ({uri: weatherIconUriGet(item.weather?.[0]?.icon)}),
    [item.weather],
  );

  const weather = useMemo(() => item.weather?.[0]?.main ?? '', [item.weather]);

  return (
    <TouchableOpacity onPress={handleItemPress} style={styles.buttonContainer}>
      <View style={styles.dataContainer}>
        <Image source={weatherIcon} resizeMode="cover" style={styles.icon} />
        <View>
          <Text
            style={[styles.cityTitle]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.name}
          </Text>
          <Text style={[styles.cityWeather]}>{weather}</Text>
        </View>
        <View style={styles.temperatureContainer}>
          <Text style={[styles.temperatureText]}>{item.main.temp} ºF</Text>
        </View>
      </View>
      <Text style={styles.arrow}>→</Text>
    </TouchableOpacity>
  );
};

export {WeatherItem};
