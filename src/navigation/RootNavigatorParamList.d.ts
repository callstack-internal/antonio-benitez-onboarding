import type {CityWeather} from '@services/api/WeatherApi/types';

export type RootStackParamList = {
  LocationList: undefined;
  LocationDetails: {
    cityWeather: CityWeather;
  };
};
