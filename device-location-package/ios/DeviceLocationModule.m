#import "DeviceLocationModule.h"
#import "DeviceLocationModuleImpl.h"

@interface DeviceLocationModule () <DeviceLocationModuleImplDelegate>
@end

@implementation DeviceLocationModule {
    DeviceLocationModuleImpl *_moduleImpl;
    RCTPromiseResolveBlock _resolveBlock;
    RCTPromiseRejectBlock _rejectBlock;
}

RCT_EXPORT_MODULE(DeviceLocationModule)

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _moduleImpl = [[DeviceLocationModuleImpl alloc] init];
        _moduleImpl.delegate = self;
    }
    return self;
}

RCT_EXPORT_METHOD(requestDeviceLocation:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    _resolveBlock = resolve;
    _rejectBlock = reject;
    [_moduleImpl requestDeviceLocation];
}

#pragma mark - DeviceLocationModuleImplDelegate

- (void)onLocationSuccess:(CLLocation *)location {
    NSDictionary *result = @{
        @"latitude": @(location.coordinate.latitude),
        @"longitude": @(location.coordinate.longitude),
        @"accuracy": @(location.horizontalAccuracy)
    };
    _resolveBlock(result);
    _resolveBlock = nil;
    _rejectBlock = nil;
}

- (void)onLocationError:(NSError *)error {
    _rejectBlock(@"LOCATION_ERROR", error.localizedDescription, error);
    _resolveBlock = nil;
    _rejectBlock = nil;
}

@end
