import type {Location} from './index.d';

import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  /**
   * Requests the device's current location.
   * Returns a Promise that resolves with latitude, longitude, and accuracy.
   */
  requestDeviceLocation(): Promise<Location>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('DeviceLocationModule');
