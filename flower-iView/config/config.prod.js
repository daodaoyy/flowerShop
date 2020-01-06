module.exports = appInfo => {
  const config = exports = {};

  config.logger = {
    dir: `/usr/local/node/logs/${appInfo.name.toLowerCase()}`,
    consoleLevel: 'DEBUG', // NONE
    level: 'DEBUG',
  };

  return config;
};
