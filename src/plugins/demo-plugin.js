const { Compilation, sources } = require("webpack")

module.exports = class DemoPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    // console.log('applying', this.options, compiler)
    const pluginName = "DemoPlugin"
    const { name } = this.options
    const logger = compiler.getInfrastructureLogger("demo plugin")
    logger.log("111")
    // logger.warnings("222")
    // logger.errors("333")

    compiler.hooks.thisCompilation.tap(
      pluginName,
      (compilation) => {
        compilation.warnings.push("warningssss")
        compilation.errors.push("errorrrr")
        compilation.hooks.processAssets.tap({
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
        },
          () => compilation.emitAsset(
            name,
            new sources.RawSource("hello!!!", true)
          )
        )
      }
    )
  }
}
