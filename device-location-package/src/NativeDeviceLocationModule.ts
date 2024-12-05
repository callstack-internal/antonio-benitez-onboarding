import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    requestDeviceLocationWithCallback(
        filename: string,
        callback: (result: {
            success: boolean,
            cancelled: boolean,
            error?: { code: number, message: string }
        }) => void
    ): void
    requestDeviceLocationWithPromise(filename: string): Promise<boolean>
}

export default TurboModuleRegistry.getEnforcing<Spec>('DeviceLocationModule');
