// src/mocks/handlers/weatherHandlers.js
import {http} from 'msw';

const mockCityWeather = id => ({
  coord: {
    lon: Math.random() * 180 - 90,
    lat: Math.random() * 180 - 90,
  },
  sys: {
    country: 'US',
    timezone: -14400,
    sunrise: 1695367200,
    sunset: 1695408000,
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
  main: {
    temp: 25 + Math.random() * 5,
    feels_like: 24 + Math.random() * 5,
    temp_min: 23,
    temp_max: 27,
    pressure: 1013,
    humidity: 78,
  },
  visibility: 10000,
  wind: {
    speed: 3.6,
    deg: 120,
  },
  clouds: {
    all: 1,
  },
  dt: Date.now() / 1000,
  id,
  name: `City ${id}`,
});

export const weatherHandlers = [
  http.get(
    `${process.env.OPEN_WEATHER_MAP_API_BASE_URL}group`,
    (req, res, ctx) => {
      const cityIds = req.url.searchParams.get('id');

      if (!cityIds) {
        return res(ctx.status(400), ctx.json({error: 'Missing city IDs'}));
      }

      const cityIdsArray = cityIds.split(',').map(Number);

      const mockResponse = {
        cnt: cityIdsArray.length,
        list: cityIdsArray.map(id => mockCityWeather(id)),
      };

      return res(ctx.status(200), ctx.json(mockResponse));
    },
  ),
];
