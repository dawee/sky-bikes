const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('../../webpack.config.js');
const compiler = webpack(config);
const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/skybikes');

app.use((req, res, next) => {
  req.db = db;

  next();
});

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);

app.listen(3000, () => console.log('Skybikes is now running on port 3000')); // eslint-disable-line no-console
