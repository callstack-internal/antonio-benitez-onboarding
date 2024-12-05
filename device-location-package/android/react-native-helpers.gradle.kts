fun safeAppExtGet(prop: String, fallback: Any?): Any? {
    val appProject = rootProject.allprojects.find { it.plugins.hasPlugin("com.android.application") }
    return when (appProject?.extra?.has(prop)) {
        true -> appProject.extra.get(prop)
        else -> fallback
    }
}


fun resolveReactNativeDirectory(): File {
    val reactNativeLocation = safeAppExtGet("REACT_NATIVE_NODE_MODULES_DIR", null)
    if (reactNativeLocation != null) {
        return File(reactNativeLocation as String)
    }

    val reactNativeFromProjectNodeModules = File("${rootProject.projectDir}/../node_modules/react-native")
    if (reactNativeFromProjectNodeModules.exists() == true) {
        return reactNativeFromProjectNodeModules
    }

    val reactNativeFromNodeModules = File("${projectDir}/../../react-native")
    if (reactNativeFromNodeModules.exists() == true) {
        return reactNativeFromNodeModules
    }

    throw GradleException(
        "[device-location-package] Unable to resolve react-native location in " +
                "node_modules. You should project extension property (in app/build.gradle) " +
                "`REACT_NATIVE_NODE_MODULES_DIR` with path to react-native."
    )
}

val reactNativeRootDir = resolveReactNativeDirectory()

val reactProperties = java.util.Properties()
java.io.InputStreamReader(
    java.io.FileInputStream(File("$reactNativeRootDir/ReactAndroid/gradle.properties")),
    Charsets.UTF_8
).use { reactProperties.load(it) }

val REACT_NATIVE_VERSION: String = reactProperties.getProperty("VERSION_NAME")
val REACT_NATIVE_MINOR_VERSION = if (REACT_NATIVE_VERSION.startsWith("0.0.0-")) {
    1000
} else {
    REACT_NATIVE_VERSION.split(Regex("\\."))[1].toInt()
}

val shouldConsumeReactNativeFromMavenCentral by extra {
    fun(): Boolean {
        return REACT_NATIVE_MINOR_VERSION >= 71
    }
}