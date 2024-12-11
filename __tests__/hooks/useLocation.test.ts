import {act, renderHook} from '@testing-library/react-native';
import {useLocation} from '@hooks/useLocation';

jest.mock('device-location-package', () => ({
  DeviceLocationModule: {
    requestDeviceLocation: jest.fn(),
  },
}));

const {DeviceLocationModule} = require('device-location-package');

describe('useLocation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch location successfully', async () => {
    const mockLocation = {latitude: 37.7749, longitude: -122.4194};
    DeviceLocationModule.requestDeviceLocation.mockResolvedValue(mockLocation);

    const {result} = renderHook(() => useLocation());

    expect(result.current.location).toBeNull();
    expect(result.current.error).toBe(false);
    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await DeviceLocationModule.requestDeviceLocation();
    });

    expect(result.current.location).toEqual(mockLocation);
    expect(result.current.error).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle location fetching error', async () => {
    DeviceLocationModule.requestDeviceLocation.mockRejectedValue(
      new Error('Failed to fetch location'),
    );

    const {result} = renderHook(() => useLocation());

    expect(result.current.location).toBeNull();
    expect(result.current.error).toBe(false);
    expect(result.current.isLoading).toBe(true);

    await act(async () => result.current.fetchLocation());

    expect(result.current.location).toBeNull();
    expect(result.current.error).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('should allow manual fetching of location', async () => {
    const mockLocation = {latitude: 40.7128, longitude: -74.006};
    DeviceLocationModule.requestDeviceLocation.mockResolvedValue(mockLocation);

    const {result} = renderHook(() => useLocation());

    await act(async () => {
      await DeviceLocationModule.requestDeviceLocation();
    });

    await act(async () => {
      result.current.fetchLocation();
    });

    expect(result.current.location).toEqual(mockLocation);
    expect(result.current.error).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });
});
