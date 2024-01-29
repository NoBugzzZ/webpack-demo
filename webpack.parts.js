const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin')
const { WebpackPluginServe } = require('webpack-plugin-serve')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const glob = require('glob')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')

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

module.exports.loadCSS = () => ({
  module: {
    rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }]
  }
})

exports.extractCSS = ({ loaders = [], options = {} } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/, use: [
          { loader: MiniCssExtractPlugin.loader, options },
          'css-loader'
        ].concat(loaders),
        sideEffects: true
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
})

exports.tailwind = () => ({
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [require('tailwindcss')()]
    }
  }
})

const ALL_FILES = glob.sync(path.join(__dirname, "src/*.js"))
exports.eliminateUnusedCSS = () => ({
  plugins: [
    new PurgeCSSPlugin({
      paths: ALL_FILES,
      extractors: [
        {
          extractor: (content) =>
            content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
          extensions: ["html"],
        },
      ],
    })
  ]
})