import {CityWeatherResponse} from '@services/api/WeatherApi/types';
import type {Location} from 'device-location-package';

import {useQuery} from '@tanstack/react-query';
import {OPEN_WEATHER_MAP_API_KEY, OPEN_WEATHER_MAP_API_BASE_URL} from '@env';

// Fetch function for OpenWeatherMap API using the /weather endpoint
const fetchLocationWeather = async (
  loc: Location,
): Promise<CityWeatherResponse> => {
  const response = await fetch(
    `${OPEN_WEATHER_MAP_API_BASE_URL}weather?lat=${loc.latitude}&lon=${loc.longitude}&appid=${OPEN_WEATHER_MAP_API_KEY}`,
  );

  if (!response.ok) {
    throw new Error('Error fetching weather data');
  }

  const data: CityWeatherResponse = await response.json();

  return data;
};

const useLocationWeatherGetQuery = (loc: Location | null) => {
  return useQuery<CityWeatherResponse>({
    enabled: !!loc,
    queryKey: ['weather', 'location', loc],
    queryFn: () => fetchLocationWeather(loc!),
  });
};

export {useLocationWeatherGetQuery};
