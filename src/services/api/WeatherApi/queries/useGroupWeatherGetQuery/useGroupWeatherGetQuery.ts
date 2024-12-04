import type {GroupWeatherResponse} from '@services/api/WeatherApi/types';

import {useQuery} from '@tanstack/react-query';
import {OPEN_WEATHER_MAP_API_KEY, OPEN_WEATHER_MAP_API_BASE_URL} from '@env';

// Fetch function for OpenWeatherMap API using the /group endpoint
const fetchGroupWeather = async (
  cityIds: number[],
): Promise<GroupWeatherResponse> => {
  const cityIdsString = cityIds.join(',');
  const response = await fetch(
    `${OPEN_WEATHER_MAP_API_BASE_URL}group?id=${cityIdsString}&appid=${OPEN_WEATHER_MAP_API_KEY}`,
  );

  if (!response.ok) {
    throw new Error('Error fetching weather data');
  }

  const data: GroupWeatherResponse = await response.json();

  return data;
};

const useGroupWeatherGetQuery = (cityIds: number[]) =>
  useQuery<GroupWeatherResponse>({
    queryKey: ['weather', cityIds],
    queryFn: () => fetchGroupWeather(cityIds),
  });

export {useGroupWeatherGetQuery};
