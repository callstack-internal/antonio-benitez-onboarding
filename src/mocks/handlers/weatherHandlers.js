import {http, HttpResponse} from 'msw';

const mockCityWeather = (id, lat, lon) => ({
  coord: {
    lon: lon || Math.random() * 180 - 90,
    lat: lat || Math.random() * 180 - 90,
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
    temp: Math.floor((275 + Math.random() * 5) * 100) / 100,
    feels_like: Math.floor((274 + Math.random() * 5) * 100) / 100,
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
      const requestUrl = req.request?.url || '';

      const url = new URL(requestUrl);
      const cityIds = url.searchParams.get('id');

      if (!cityIds) {
        return res(ctx.status(400), ctx.json({error: 'Missing city IDs'}));
      }

      const cityIdsArray = cityIds.split(',').map(Number);

      const mockResponse = {
        cnt: cityIdsArray.length,
        list: cityIdsArray.map(id => mockCityWeather(id)),
      };

      return HttpResponse.json(mockResponse);
    },
  ),

  http.get(
    `${process.env.OPEN_WEATHER_MAP_API_BASE_URL}weather`,
    (req, res, ctx) => {
      const requestUrl = req.request?.url || '';

      const url = new URL(requestUrl);
      const lat = url.searchParams.get('lat');
      const lon = url.searchParams.get('lon');

      if (!lat || !lon) {
        return HttpResponse.text('Missing latitude or longitude', {
          status: 400,
        });
      }

      const mockResponse = mockCityWeather(
        Math.floor(Math.random() * 1000),
        parseFloat(lat),
        parseFloat(lon),
      );

      return HttpResponse.json(mockResponse);
    },
  ),
];
