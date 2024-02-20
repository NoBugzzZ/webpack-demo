const { mode } = require('webpack-nano/argv')
const { merge } = require('webpack-merge')
const parts = require('./webpack.parts')
const path = require('path')

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
      chunkFilename: 'chunk.[id].js',
      clean: true
    }
  },
  parts.page(),
  parts.extractCSS({ loaders: [parts.autoprefixer(), parts.tailwind()] }),
  parts.loadImages({ limit: 7281 }),
  parts.loadFont(),
  parts.loadJS()
])

const productionConfig = merge([
  {
    stats: {
      optimizationBailout: true,
      usedExports: true,
      // preset:'verbose'
    }
  },
  parts.eliminateUnusedCSS(),
  parts.generateSourceMaps({ type: 'cheap-module-source-map' }),
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
])

const developmentConfig = merge([
  { entry: ['webpack-plugin-serve/client'] },
  parts.devServe(),
  parts.generateSourceMaps({ type: 'inline-source-map' })
])

const getConfig = (mode) => {
  switch (mode) {
    case 'none':
    case 'production':
      return merge(commonConfig, productionConfig, { mode })
    case 'development':
      return merge(commonConfig, developmentConfig, { mode })
    default:
      throw new Error(`unknown mode: ${mode}`)
  }
}

module.exports = getConfig(mode)
