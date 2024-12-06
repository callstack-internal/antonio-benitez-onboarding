package com.devicelocationpackage

import android.content.Context
import com.facebook.react.bridge.Arguments
import android.location.Location
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationResult
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationAvailability
import com.google.android.gms.location.Priority

/**
 * Shared implementation for DeviceLocationModule
 */
class DeviceLocationModuleImpl(private val reactContext: ReactApplicationContext) {

    companion object {
        const val NAME = "DeviceLocationModule"
    }

    private val fusedLocationClient: FusedLocationProviderClient =
        LocationServices.getFusedLocationProviderClient(reactContext)

    fun requestDeviceLocation(promise: Promise) {
        if (!isPermissionGranted()) {
            promise.reject("PERMISSION_DENIED", "Location permission denied")
            return
        }

        fusedLocationClient.lastLocation.addOnSuccessListener { location ->
            if (location != null) {
                val writableMap = locationToWritableMap(location)
                promise.resolve(writableMap)
            } else {
                requestNewLocation(promise)
            }
        }.addOnFailureListener { exception ->
            promise.reject("LOCATION_ERROR", exception.message)
        }
    }

    private fun locationToWritableMap(location: Location): WritableMap {
        val map = Arguments.createMap()
        map.putDouble("latitude", location.latitude)
        map.putDouble("longitude", location.longitude)
        map.putDouble("accuracy", location.accuracy.toDouble())
        return map
    }

    private fun requestNewLocation(promise: Promise) {
        val locationRequest = LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, 1000)
            .setMaxUpdates(1)
            .build()

        val locationCallback = object : LocationCallback() {
            override fun onLocationResult(locationResult: LocationResult) {
                val location = locationResult.lastLocation
                if (location != null) {
                    promise.resolve(locationToMap(location))
                } else {
                    promise.reject("LOCATION_ERROR", "No location found")
                }
                fusedLocationClient.removeLocationUpdates(this)
            }

            override fun onLocationAvailability(locationAvailability: LocationAvailability) {
                if (!locationAvailability.isLocationAvailable) {
                    promise.reject("LOCATION_UNAVAILABLE", "Location is unavailable")
                }
            }
        }

        fusedLocationClient.requestLocationUpdates(locationRequest, locationCallback, reactContext.mainLooper)
    }

    private fun locationToMap(location: Location): Map<String, Any> {
        return mapOf(
            "latitude" to location.latitude,
            "longitude" to location.longitude,
            "accuracy" to location.accuracy
        )
    }

    private fun isPermissionGranted(): Boolean {
        return true
    }
}
