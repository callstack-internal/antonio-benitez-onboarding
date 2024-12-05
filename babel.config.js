module.exports = {
  presets: ['@react-native/babel-preset', '@babel/preset-typescript'],
  plugins: [
    'react-native-reanimated/plugin',
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@helpers': './src/helpers',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@services': './src/services',
          '@types': './src/types',
        },
      },
    ],
  ],
};
