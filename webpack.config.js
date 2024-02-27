const { mode } = require('webpack-nano/argv')
const { merge } = require('webpack-merge')
const parts = require('./webpack.parts')
const path = require('path')
const webpack = require('webpack')

// console.log(mode, ' ', process.env.PORT, ' ', process.env.port)

const commonConfig = merge([
  {
    entry: ['./src'],
    // entry:{
    //   app:{
    //     import:path.join(__dirname,'src','index.js'),
    //     dependOn:"vendor"
    //   },
    //   vendor:['react','react-dom']
    // },
    output: {
      // path:path.join(__dirname,'build'),
      clean: true,
      chunkFilename: 'chunk.[name].[contenthash].js',
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'asset.[name].[contenthash][ext][query]'
    }
  },
  parts.page(),
  parts.extractCSS({ loaders: [parts.autoprefixer(), parts.tailwind()] }),
  parts.loadImages({ limit: 7281 }),
  parts.loadFont(),
  parts.loadJS(),
  parts.setEnvVariable({ key: 'ENV', value: 'xixi' }, mode),
  parts.bundleSpliting()
])

const productionConfig = merge([
  {
    stats: {
      optimizationBailout: true,
      usedExports: true
      // preset:'verbose'
    }
  },
  parts.eliminateUnusedCSS(),
  parts.generateSourceMaps({ type: 'source-map' }),
  parts.bundleSpliting(),
  parts.attachRevision(),
  parts.minifyJs(),
  parts.minifyCss({ options: { preset: ['default'] } }),
  { optimization: { chunkIds: 'named', moduleIds: 'named' } },
  // {
  //   optimization: {
  //     usedExports: true,
  //     minimize: false,
  //     concatenateModules: false
  //   }
  // }
  {
    optimization: {
      splitChunks: { chunks: 'all' },
      runtimeChunk: { name: 'runtime' }
    }
  },
  { recordsPath: path.join(__dirname, 'records.json') },
  { profile: true },
  {
    performance: {
      hints: 'warning',
      maxEntrypointSize: 50000,
      maxAssetSize: 100000
    }
  }
])

const developmentConfig = merge([
  { entry: ['webpack-plugin-serve/client'] },
  parts.devServe(),
  parts.generateSourceMaps({ type: 'source-map' }),
  // {
  //   cache: {
  //     type: 'filesystem',
  //     buildDependencies: {
  //       config: [__filename]
  //     }
  //   }
  // },
  parts.dontParse({
    name: 'react',
    path: path.resolve(
      __dirname,
      'node_modules/react/cjs/react.production.min.js'
    )
  })
])

const analyzeConfig = merge([
  productionConfig,
  // parts.bundleAnalyzer(),
  { plugins: [new webpack.ProgressPlugin()] },
  { plugins: [new webpack.debug.ProfilingPlugin()] }
])

const getConfig = (mode) => {
  switch (mode) {
    case 'none':
    case 'production':
      return merge(commonConfig, productionConfig, { mode })
    case 'development':
      return merge(commonConfig, developmentConfig, { mode })
    case 'analyze':
      return merge(commonConfig, analyzeConfig, { mode: 'production' })
    default:
      throw new Error(`unknown mode: ${mode}`)
  }
}

module.exports = getConfig(mode)
