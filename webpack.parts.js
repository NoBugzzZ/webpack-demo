const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin')
const { WebpackPluginServe } = require('webpack-plugin-serve')

module.exports.devServe = () => ({
  watch: true,
  plugins: [
    new WebpackPluginServe({
      port: parseInt(process.env.PORT, 10) || 8888,
      static: './dist',
      liveReload: true,
      waitForBuild: true,
      host: '127.0.0.1'
    })
  ]
})

module.exports.page = ({ title } = { title: 'hello~~~' }) => ({
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title
      }
    })
  ]
})
