const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");
const { withStorybook } = require("@storybook/react-native/metro/withStorybook");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = withStorybook(
  withNativewind(config, {
    inlineVariables: false,
    globalClassNamePolyfill: false,
  }),
  {
    enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true",
    configPath: require("path").resolve(__dirname, "./.rnstorybook"),
  }
);
