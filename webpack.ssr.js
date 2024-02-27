const path = require('path')
const APP_SOURCE = path.resolve(__dirname, 'src')

module.exports = {
  mode: 'production',
  entry: { index: path.resolve(APP_SOURCE, 'ssr.js') },
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].js',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: APP_SOURCE,
        use: 'babel-loader'
      }
    ]
  }
}
