const { merge } = require('webpack-merge')
const parts = require('./webpack.parts')
const { mode } = require('webpack-nano/argv')

module.exports = merge([
  {
    mode: 'production',
    entry: { app: './src/index.js', another: './src/multi.js' },
    output: {
        // path:path.join(__dirname,'build'),
        clean: true,
        chunkFilename: 'chunk.[name].[contenthash].js',
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'asset.[name].[contenthash][ext][query]'
      }
  },
  parts.extractCSS({ loaders: [parts.autoprefixer(), parts.tailwind()] }),
  parts.loadImages({ limit: 7281 }),
  parts.loadFont(),
  parts.loadJS(),
  parts.setEnvVariable({ key: 'ENV', value: 'xixi' }, mode),
  parts.bundleSpliting(),
  parts.page({ title: 'Demo', chunks: ['app'] }),
  parts.page({ title: 'Another', url: 'another', chunks: 'another' })
])
