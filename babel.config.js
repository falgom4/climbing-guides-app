module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Opcional: Si usas reanimated para animaciones
      // 'react-native-reanimated/plugin',
    ],
  };
};