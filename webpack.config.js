const { mode } = require('webpack-nano/argv')
const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin')
const { WebpackPluginServe } = require('webpack-plugin-serve')

console.log(mode, ' ', process.env.PORT, ' ', process.env.port)

module.exports = {
  watch: mode === 'development',
  entry: ['./src', 'webpack-plugin-serve/client'],
  mode,
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: 'webpack-demo QvQ'
      }
    }),
    new WebpackPluginServe({
      port: parseInt(process.env.PORT, 10) || 8888,
      static: './dist',
      liveReload: true,
      waitForBuild: true,
      host:'127.0.0.1'
    })
  ]
}
