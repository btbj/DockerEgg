/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1584182854965_2447';

  // add your middleware config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql',
    host: 'mysql',
    port: 3306,
    database: 'egg_db',
    username: 'root',
    password: '123456',
  };

  config.cluster = {
    listen: {
      port: 7001,
      hostname: 'web',
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
