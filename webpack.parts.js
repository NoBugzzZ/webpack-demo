const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin')
const { WebpackPluginServe } = require('webpack-plugin-serve')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const glob = require('glob')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

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
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, options },
          'css-loader'
        ].concat(loaders),
        sideEffects: true
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
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

const ALL_FILES = glob.sync(path.join(__dirname, 'src/*.js'))
exports.eliminateUnusedCSS = () => ({
  plugins: [
    new PurgeCSSPlugin({
      paths: ALL_FILES,
      extractors: [
        {
          extractor: (content) =>
            content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
          extensions: ['html']
        }
      ]
    })
  ]
})

exports.autoprefixer = () => ({
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [require('autoprefixer')()]
    }
  }
})

exports.loadImages = ({ limit = 4 * 1024 } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: limit } }
      },
      {
        test: /\.svg$/,
        type: 'asset'
      }
    ]
  }
})
exports.loadFont = () => ({
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: 'asset/resource'
      }
    ]
  }
})
exports.loadJS = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: path.join(__dirname, 'src')
      }
    ]
  }
})

module.exports.generateSourceMaps = ({ type }) => ({
  devtool: type
})

exports.bundleSpliting = () => ({
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial'
        }
      }
    }
  }
})

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: 'hello world'
    })
  ]
})

exports.minifyJs = () => ({
  optimization: {
    minimizer: [new TerserPlugin()]
  }
})

exports.minifyCss = ({ options }) => ({
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: options
      })
    ]
  }
})

exports.setEnvVariable = ({ key, value }, NODE_ENV) => ({
  plugins: [
    new webpack.DefinePlugin({
      [key]: JSON.stringify(value),
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    })
  ]
})
