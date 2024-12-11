import type {CityWeather} from '@services/api/WeatherApi/types';

import React, {useMemo} from 'react';
import {Image, Text, View} from 'react-native';

import {weatherIconUriGet} from '@helpers/WeatherApi/weatherIconUriGet.ts';

import {styles} from './WeatherItem.style.ts';

export type WeatherItemProps = {
  item: CityWeather;
};

const WeatherItem: React.FC<WeatherItemProps> = ({item}) => {
  const weatherIcon = useMemo(
    () => ({uri: weatherIconUriGet(item.weather?.[0]?.icon)}),
    [item.weather],
  );
  const weather = useMemo(() => item.weather?.[0]?.main ?? '', [item.weather]);

  return (
    <View style={styles.buttonContainer}>
      <View style={styles.iconContainer}>
        <Image
          source={weatherIcon}
          resizeMode="cover"
          style={styles.icon}
          testID="weather-icon"
        />

        <View style={styles.cityContainer}>
          <Text style={styles.cityTitle} numberOfLines={3} ellipsizeMode="tail">
            {item.name}
          </Text>
          <Text style={styles.cityWeather}>{weather}</Text>
        </View>
      </View>

      <View style={styles.temperatureContainer}>
        <Text style={styles.temperatureText}>{item.main.temp} ºF</Text>
      </View>
    </View>
  );
};

export {WeatherItem};
