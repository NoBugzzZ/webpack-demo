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
  parts.loadJS(),
  { optimization: { chunkIds: 'named', moduleIds: 'named' } }
])

const productionConfig = merge([
  parts.eliminateUnusedCSS(),
  parts.generateSourceMaps({ type: 'source-map' }),
  parts.bundleSpliting(),
  parts.attachRevision()
])

const developmentConfig = merge([
  { entry: ['webpack-plugin-serve/client'] },
  parts.devServe(),
  parts.generateSourceMaps({ type: 'inline-cheap-module-source-map' })
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
