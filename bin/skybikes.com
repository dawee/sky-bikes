#!/usr/bin/env node

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config.js');
const createServer = require('../src/server')

const webpackCompiler = webpack(webpackConfig);

createServer('mongodb://localhost/skybikes', [], true).then(server => {
  server.use(webpackDevMiddleware(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath
  }));

  server.listen(3000, () => console.log('Sky Bikes! is now running on port 3000'));
});
