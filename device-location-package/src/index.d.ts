export interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export const DeviceLocationModule: {
  requestDeviceLocation(): Promise<Location>;
};
