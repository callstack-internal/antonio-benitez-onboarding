import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';

import {http, HttpResponse} from 'msw';
import LocationListScreen from '@screens/locationList/LocationListScreen.tsx';
import {CityWeather} from '@services/api/WeatherApi/types';
import {setupServer} from 'msw/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

jest.mock(
  '@screens/locationList/parts/UserLocationWeather/UserLocationWeather.tsx',
  () => ({
    UserLocationWeather: () => null,
  }),
);

const DATA: {list: CityWeather[]} = {
  list: [
    {id: 1, name: 'City 1', main: {temp: 25}},
    {id: 2, name: 'City 2', main: {temp: 30}},
  ] as CityWeather[],
};

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

describe('LocationListScreen', () => {
  it('renders loading state', () => {
    server.use(
      http.get(
        `${process.env.OPEN_WEATHER_MAP_API_BASE_URL}group`,
        async () => {
          await new Promise(resolve => setTimeout(resolve, 1000));
          return HttpResponse.json(DATA);
        },
      ),
    );

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <LocationListScreen />
      </QueryClientProvider>,
    );

    expect(screen.getByTestId('location-list-loading')).toBeTruthy();
  });

  it('renders error state', async () => {
    server.use(
      http.get(
        `${process.env.OPEN_WEATHER_MAP_API_BASE_URL}group`,
        async () => {
          return HttpResponse.text('Error', {status: 500});
        },
      ),
    );
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <LocationListScreen />
      </QueryClientProvider>,
    );
    await waitFor(() => {
      expect(screen.getByTestId('location-list-error')).toBeTruthy();
    });
  });

  it('renders empty state', async () => {
    server.use(
      http.get(
        `${process.env.OPEN_WEATHER_MAP_API_BASE_URL}group`,
        async () => {
          return HttpResponse.json({list: []});
        },
      ),
    );

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <LocationListScreen />
      </QueryClientProvider>,
    );

    await screen.findByTestId('location-list-empty');

    expect(screen.getByText('No weather data available')).toBeTruthy();
  });

  it('renders data state', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });

    server.use(
      http.get(
        `${process.env.OPEN_WEATHER_MAP_API_BASE_URL}group`,
        async () => {
          return HttpResponse.json(DATA);
        },
      ),
    );

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <LocationListScreen />
      </QueryClientProvider>,
    );

    await screen.findByTestId('location-list-data', {
      timeout: 3000,
    });

    expect(screen.getByText('City 1')).toBeTruthy();
    expect(screen.getByText('City 2')).toBeTruthy();
  });
});
