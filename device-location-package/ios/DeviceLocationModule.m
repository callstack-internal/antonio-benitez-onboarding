#import "DeviceLocationModule.h"

@interface DeviceLocationModule() <CLLocationManagerDelegate>
@property (strong, nonatomic) CLLocationManager *locationManager;
@property (copy, nonatomic) RCTPromiseResolveBlock resolve;
@property (copy, nonatomic) RCTPromiseRejectBlock reject;
@property (assign, nonatomic) BOOL promiseHandled;
@end

@implementation DeviceLocationModule

RCT_EXPORT_MODULE(DeviceLocationModule)

- (instancetype)init {
    self = [super init];
    if (self) {
        self.locationManager = [[CLLocationManager alloc] init];
        self.locationManager.delegate = self;
        self.promiseHandled = NO;
    }
    return self;
}

RCT_EXPORT_METHOD(requestDeviceLocation:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    self.resolve = resolve;
    self.reject = reject;
    self.promiseHandled = NO;

    CLAuthorizationStatus status = self.locationManager.authorizationStatus;

    if (status == kCLAuthorizationStatusNotDetermined) {
        [self.locationManager requestWhenInUseAuthorization];
    } else if (status == kCLAuthorizationStatusDenied || status == kCLAuthorizationStatusRestricted) {
        [self rejectIfNeededWithCode:@"permission_denied" message:@"Location permission denied" error:nil];
    } else if (status == kCLAuthorizationStatusAuthorizedWhenInUse || status == kCLAuthorizationStatusAuthorizedAlways) {
        [self.locationManager startUpdatingLocation];
    } else {
        [self rejectIfNeededWithCode:@"unknown_status" message:@"Unknown authorization status" error:nil];
    }
}

#pragma mark - CLLocationManagerDelegate

- (void)locationManagerDidChangeAuthorization:(CLLocationManager *)manager {
    if (self.promiseHandled) {
        return;
    }

    CLAuthorizationStatus status = manager.authorizationStatus;

    if (status == kCLAuthorizationStatusAuthorizedWhenInUse || status == kCLAuthorizationStatusAuthorizedAlways) {
        [self.locationManager startUpdatingLocation];
    } else if (status == kCLAuthorizationStatusDenied || status == kCLAuthorizationStatusRestricted) {
        [self rejectIfNeededWithCode:@"permission_denied" message:@"Location permission denied" error:nil];
    }
}

- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(nonnull NSArray<CLLocation *> *)locations {
    if (self.promiseHandled) {
        return;
    }

    CLLocation *location = [locations lastObject];
    if (location) {
        NSDictionary *locationData = @{
            @"latitude": @(location.coordinate.latitude),
            @"longitude": @(location.coordinate.longitude),
            @"accuracy": @(location.horizontalAccuracy)
        };
        [self resolveIfNeededWithResult:locationData];
        [self.locationManager stopUpdatingLocation];
    }
}

- (void)locationManager:(CLLocationManager *)manager didFailWithError:(nonnull NSError *)error {
    [self rejectIfNeededWithCode:@"location_error" message:@"Failed to get location" error:error];
}

#pragma mark - Promise Helpers

- (void)resolveIfNeededWithResult:(id)result {
    if (!self.promiseHandled && self.resolve) {
        self.resolve(result);
        self.promiseHandled = YES;
        self.resolve = nil;
        self.reject = nil;
    }
}

- (void)rejectIfNeededWithCode:(NSString *)code message:(NSString *)message error:(NSError *)error {
    if (!self.promiseHandled && self.reject) {
        self.reject(code, message, error);
        self.promiseHandled = YES;
        self.resolve = nil;
        self.reject = nil;
    }
}

@end
