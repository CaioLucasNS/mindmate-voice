// module.exports = function (api) {
//     api.cache(true);
//     return {
//         presets: ['babel-preset-expo'],
//         plugins: [
//             [
//                 'module-resolver',
//                 {
//                     root: ['./src'],
//                     alias: {
//                         '@': './src',
//                         '@env': './src/env.d.ts',
//                     },
//                 },
//             ],
//             ['module:react-native-dotenv'],
//         ],
//     };
// };
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@env': './src/env.d.ts',
          },
        },
      ],
      [
        'dotenv-import',
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
    ],
  };
};
