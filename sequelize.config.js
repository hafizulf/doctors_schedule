const path = require('path');
const env = process.env.NODE_ENV || 'development';
const configPath = path.resolve(__dirname, './src/config/database.config.js');
const config = require(configPath)[env];

module.exports = {
  [env]: config,
};
