package com.devicelocationpackage

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = DeviceLocationModule.NAME)
class DeviceLocationModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val moduleImpl = DeviceLocationModuleImpl(reactContext)

    override fun getName() = DeviceLocationModule.NAME

    @ReactMethod
    fun requestDeviceLocation(promise: Promise) {
        moduleImpl.requestDeviceLocation(promise)
    }

    companion object {
        const val NAME = DeviceLocationModuleImpl.NAME
    }
}
