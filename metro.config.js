const { withNativeWind } = require('nativewind/metro');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// Get default Metro configuration
const defaultConfig = getDefaultConfig(__dirname);

// Your custom configuration
const customConfig = {
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs'],
  },
};

// Merge default and custom configs
const mergedConfig = mergeConfig(defaultConfig, customConfig);

// Apply NativeWind configuration
const nativeWindConfig = withNativeWind(mergedConfig, {
  input: './global.css',
});

// Finally, wrap with Reanimated configuration and export
module.exports = wrapWithReanimatedMetroConfig(nativeWindConfig);
