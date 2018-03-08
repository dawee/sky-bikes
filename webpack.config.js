const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'skybikes.js',
    path: path.resolve(__dirname, 'dist')
  }
};
