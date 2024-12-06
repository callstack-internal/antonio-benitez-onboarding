package com.devicelocationpackage

import android.Manifest
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.modules.core.PermissionListener
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices

class DeviceLocationModuleImpl(private val reactContext: ReactApplicationContext) {

    private val fusedLocationClient: FusedLocationProviderClient =
        LocationServices.getFusedLocationProviderClient(reactContext)

    private var pendingPromise: Promise? = null

    fun requestDeviceLocation(promise: Promise) {
        if (!isPermissionGranted()) {
            requestPermissions(promise)
            return
        }

        fetchLocation(promise)
    }

    private fun isPermissionGranted(): Boolean {
        val context = reactContext.applicationContext
        return ActivityCompat.checkSelfPermission(
            context,
            Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED &&
                ActivityCompat.checkSelfPermission(
                    context,
                    Manifest.permission.ACCESS_COARSE_LOCATION
                ) == PackageManager.PERMISSION_GRANTED
    }

    private fun requestPermissions(promise: Promise) {
        val activity = reactContext.currentActivity
        if (activity == null) {
            promise.reject("NO_ACTIVITY", "Activity doesn't exist")
            return
        }

        if (activity is PermissionAwareActivity) {
            pendingPromise = promise
            activity.requestPermissions(
                arrayOf(
                    Manifest.permission.ACCESS_FINE_LOCATION,
                    Manifest.permission.ACCESS_COARSE_LOCATION
                ),
                1,
                PermissionListener { requestCode, permissions, grantResults ->
                    if (requestCode == 1 && grantResults.all { it == PackageManager.PERMISSION_GRANTED }) {
                        fetchLocation(pendingPromise!!)
                    } else {
                        pendingPromise?.reject("PERMISSION_DENIED", "Location permission denied")
                    }
                    pendingPromise = null
                    true
                }
            )
        } else {
            promise.reject("NO_PERMISSION_AWARE_ACTIVITY", "Activity is not PermissionAware")
        }
    }

    private fun fetchLocation(promise: Promise) {
        fusedLocationClient.lastLocation.addOnSuccessListener { location ->
            if (location != null) {
                val map = Arguments.createMap().apply {
                    putDouble("latitude", location.latitude)
                    putDouble("longitude", location.longitude)
                    putDouble("accuracy", location.accuracy.toDouble())
                }
                promise.resolve(map)
            } else {
                promise.reject("LOCATION_ERROR", "Failed to fetch location")
            }
        }.addOnFailureListener { exception ->
            promise.reject("LOCATION_ERROR", exception.message)
        }
    }
}
