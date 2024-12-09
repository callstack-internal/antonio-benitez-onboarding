import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import {TouchableWeatherItem} from '@screens//locationList/parts/TouchableWeatherItem/TouchableWeatherItem.tsx';
import {useNavigation} from '@react-navigation/native';
import {CityWeather} from '@services/api/WeatherApi/types';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('TouchableWeatherItem', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
  });

  it('receives the correct props and navigates to LocationDetails screen with correct data when pressed', () => {
    const mockItem = {
      id: 1,
      name: 'Kyiv',
      main: {temp: 25},
      coord: {lon: 30.5167, lat: 50.4501},
      sys: {
        country: 'UA',
        sunrise: 1627898400,
        sunset: 1627948800,
      },
      weather: [
        {id: 800, main: 'Clear', description: 'clear sky', icon: '01d'},
      ],
      visibility: 10000,
      wind: {speed: 3.1, deg: 200},
      clouds: {all: 0},
      dt: 1627920000,
    } as CityWeather;

    render(<TouchableWeatherItem item={mockItem} />);

    fireEvent.press(screen.getByTestId('weather-item-button'));

    expect(mockNavigate).toHaveBeenCalledWith('LocationDetails', {
      cityWeather: mockItem,
    });
  });
});
