import type {CityWeather} from '@services/api/WeatherApi/types';

import React, {useCallback} from 'react';
import {Text, TouchableOpacity, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {RootStackParamList} from '@navigation/RootNavigatorParamList';

import {styles} from './WeatherItem.style.ts';

type Props = {
  item: CityWeather;
};

const WeatherItem: React.FC<Props> = ({item}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleItemPress = useCallback(() => {
    navigation.navigate('LocationDetails');
  }, [navigation]);

  return (
    <TouchableOpacity onPress={handleItemPress} style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export {WeatherItem};
