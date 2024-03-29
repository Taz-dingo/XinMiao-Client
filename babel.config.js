module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    //   ["react-native-worklets-core/plugin"],
    'react-native-reanimated/plugin',

    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: './src',
            rootPathPrefix: '@/', // 使用 ~/  代替 ./src (~指向的就是src目录)
          },
        ],
      },
    ],
  ],
};

