if (process.env.NODE_ENV === 'production') {
  module.exports = require('./store.prod')
} else if (process.env.NODE_ENV === 'development') {
  module.exports = require('./store.dev')
}
