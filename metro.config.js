const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const { withTamagui } = require('@tamagui/metro-plugin')
const path = require('path');

const config = getDefaultConfig(__dirname)

// Add alias resolver
config.resolver.alias = {
  '@': path.resolve(__dirname, 'src'),
};

module.exports = withNativeWind(
  withTamagui(config, {
    components: ['tamagui'],
    config: './tamagui.config.ts',
    outputCSS: './tamagui-web.css',
  }),
  { input: './global.css' }
)