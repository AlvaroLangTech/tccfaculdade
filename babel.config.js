// Configuração do Babel para o Expo (necessário para o Expo Router funcionar)
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
