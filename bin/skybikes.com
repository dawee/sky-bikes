#!/usr/bin/env node

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const mongoose = require('mongoose');
const webpackConfig = require('../webpack.config.js');
const {createServer} = require('../src/server')

const webpackCompiler = webpack(webpackConfig);
const server = createServer(mongoose);

server.use(webpackDevMiddleware(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath
}));

server.listen(3000, () => console.log('Sky Bikes is now running on port 3000'));
