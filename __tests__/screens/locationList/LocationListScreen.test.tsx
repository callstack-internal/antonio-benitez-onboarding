import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';

import LocationListScreen from '@screens/locationList/LocationListScreen.tsx';

jest.mock('@hooks/useLocation.ts', () => ({
  useLocation: () => ({
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
  }),
}));

jest.mock('@services/api/WeatherApi', () => ({
  useGroupWeatherGetQuery: jest.fn(),
  useLocationWeatherGetQuery: jest.fn(),
}));

jest.mock('@services/api/WeatherApi', () => ({
  useGroupWeatherGetQuery: jest.fn(),
  useLocationWeatherGetQuery: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const mockUseGroupWeatherGetQuery = jest.requireMock(
  '@services/api/WeatherApi',
).useGroupWeatherGetQuery;

const mockUseLocationWeatherGetQuery = jest.requireMock(
  '@services/api/WeatherApi',
).useLocationWeatherGetQuery;

mockUseLocationWeatherGetQuery.mockReturnValue({
  isLoading: false,
  data: {id: 1, name: 'City local weather', main: {temp: 35}},
  error: null,
});

describe('LocationListScreen', () => {
  it('renders loading state', () => {
    mockUseGroupWeatherGetQuery.mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
    });

    render(<LocationListScreen />);
    expect(screen.getByTestId('location-list-loading')).toBeTruthy();
  });

  it('renders error state', () => {
    mockUseGroupWeatherGetQuery.mockReturnValue({
      isLoading: false,
      data: null,
      error: 'Network error',
    });

    render(<LocationListScreen />);
    expect(screen.getByTestId('location-list-error')).toBeTruthy();
  });

  it('renders empty state', () => {
    mockUseGroupWeatherGetQuery.mockReturnValue({
      isLoading: false,
      data: {list: []},
      error: null,
    });

    render(<LocationListScreen />);
    expect(screen.getByTestId('location-list-empty')).toBeTruthy();
  });

  it('renders data state', () => {
    const mockData = {
      list: [
        {id: 1, name: 'City 1', main: {temp: 25}},
        {id: 2, name: 'City 2', main: {temp: 30}},
      ],
    };

    mockUseGroupWeatherGetQuery.mockReturnValue({
      isLoading: false,
      data: mockData,
      error: null,
    });

    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });

    render(<LocationListScreen />);
    expect(screen.getByTestId('location-list-data')).toBeTruthy();
    expect(screen.getByText('City 1')).toBeTruthy();
    expect(screen.getByText('City 2')).toBeTruthy();
  });

  it('renders user location data', () => {
    mockUseGroupWeatherGetQuery.mockReturnValue({
      isLoading: false,
      data: {list: []},
      error: null,
    });

    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });

    render(<LocationListScreen />);
    expect(screen.getByTestId('user-location-data')).toBeTruthy();
    expect(screen.getByText('City local weather')).toBeTruthy();
    expect(screen.getByText('35 ºF')).toBeTruthy();
  });
});
