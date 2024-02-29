module.exports = class DemoPlugin {
  constructor(options) {
    this.options = options
  }
  apply() {
    console.log('applying', this.options)
  }
}
