import React from 'react';
import {render, screen} from '@testing-library/react-native';

import {
  WeatherItem,
  WeatherItemProps,
} from '@components/WeatherItem/WeatherItem.tsx';

jest.mock('@components/WeatherItem/WeatherItem.style.ts', () => ({
  styles: {
    buttonContainer: {},
    iconContainer: {},
    icon: {},
    cityContainer: {},
    cityTitle: {},
    cityWeather: {},
    temperatureContainer: {},
    temperatureText: {},
  },
}));

jest.mock('@helpers/WeatherApi/weatherIconUriGet.ts', () => ({
  weatherIconUriGet: jest.fn(
    (icon: string) => `https://example.com/${icon}.png`,
  ),
}));

describe('WeatherItem Component', () => {
  const mockItem: WeatherItemProps['item'] = {
    name: 'Kraków',
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
    main: {
      temp: 22,
      feels_like: 21,
      temp_min: 20,
      temp_max: 23,
      pressure: 1012,
      humidity: 45,
    },
    coord: {lon: 19.945, lat: 50.0647},
    sys: {
      country: 'PL',
      timezone: 3600,
      sunrise: 1627898400,
      sunset: 1627948800,
    },
    visibility: 10000,
    wind: {speed: 3.6, deg: 270},
    clouds: {all: 5},
    dt: 1627920000,
    id: 3094802,
  };

  it('renders city name, weather type, and temperature correctly', () => {
    render(<WeatherItem item={mockItem} />);

    expect(screen.getByText('Kraków')).toBeTruthy();

    expect(screen.getByText('Clear')).toBeTruthy();

    expect(screen.getByText('22 ºF')).toBeTruthy();
  });

  it('renders the weather icon', () => {
    render(<WeatherItem item={mockItem} />);

    const image = screen.getByTestId('weather-icon');
    expect(image.props.source.uri).toBe('https://example.com/01d.png');
  });

  it('handles missing weather information gracefully', () => {
    const mockItemWithNoWeather: WeatherItemProps['item'] = {
      name: 'Warszawa',
      weather: [],
      main: {
        temp: 18,
        feels_like: 18,
        temp_min: 17,
        temp_max: 19,
        pressure: 1010,
        humidity: 55,
      },
      coord: {lon: 21.0122, lat: 52.2298},
      sys: {
        country: 'PL',
        timezone: 3600,
        sunrise: 1627898400,
        sunset: 1627948800,
      },
      visibility: 10000,
      wind: {speed: 4.1, deg: 180},
      clouds: {all: 10},
      dt: 1627920000,
      id: 756135,
    };

    render(<WeatherItem item={mockItemWithNoWeather} />);

    expect(screen.getByText('Warszawa')).toBeTruthy();

    expect(screen.getByText('')).toBeTruthy();

    expect(screen.getByText('18 ºF')).toBeTruthy();
  });
});
