import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  /**
   * Requests the device's current location.
   * Returns a Promise that resolves with latitude, longitude, and accuracy.
   */
  requestDeviceLocation(): Promise<{
    latitude: number;
    longitude: number;
    accuracy: number;
  }>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('DeviceLocationModule');
