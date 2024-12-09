import React, {useCallback} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {RootStackParamList} from '@navigation/RootNavigatorParamList';
import {
  WeatherItem,
  WeatherItemProps,
} from '@components/WeatherItem/WeatherItem.tsx';

import {styles} from './TouchableWeatherItem.style.ts';

type Props = WeatherItemProps;

const TouchableWeatherItem: React.FC<Props> = ({item}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleItemPress = useCallback(() => {
    navigation.navigate('LocationDetails', {
      cityWeather: item,
    });
  }, [navigation, item]);

  return (
    <TouchableOpacity onPress={handleItemPress} style={styles.container}>
      <WeatherItem item={item} />
      <Text style={styles.arrow}>→</Text>
    </TouchableOpacity>
  );
};

export {TouchableWeatherItem};
