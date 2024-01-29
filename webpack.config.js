const { mode } = require('webpack-nano/argv')
const { merge } = require('webpack-merge')
const parts = require('./webpack.parts')

console.log(mode, ' ', process.env.PORT, ' ', process.env.port)

const commonConfig = merge([
  { entry: ['./src'] },
  parts.page(),
  parts.extractCSS()
])

const productionConfig = merge([])

const developmentConfig = merge([
  { entry: ['webpack-plugin-serve/client'] },
  parts.devServe()
])

const getConfig = (mode) => {
  switch (mode) {
    case 'production':
      return merge(commonConfig, productionConfig, { mode })
    case 'development':
      return merge(commonConfig, developmentConfig, { mode })
    default:
      throw new Error(`unknown mode: ${mode}`)
  }
}

module.exports = getConfig(mode)
