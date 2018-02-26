require('@babel/register');
require('@babel/polyfill');

require('dotenv').config()

module.exports = require('./webpack.config.production');