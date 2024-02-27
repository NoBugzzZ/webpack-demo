const path = require("path");
const { component, mode } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");
const { ModuleFederationPlugin } = require('webpack').container

const commonConfig = merge([
    {
        // entry: [path.join(__dirname, 'src', 'bootstrap.js')],
        output: { publicPath: '/' }
    },
    parts.page(),
    parts.loadJS(),
    parts.loadImages(),
    parts.extractCSS({ loaders: [parts.tailwind()] }),
])

const config = {
    development: merge([
        { entry: ['webpack-plugin-serve/client'] },
        parts.devServe()
    ]),
    production: {}
}

const shared = {
    react: { singleton: true },
    'react-dom': { singleton: true }
}

const componentConfig = {
    app: merge([
        { entry: [path.join(__dirname, "src", "bootstrap.js")] },
        parts.page(),
        parts.federateModule({
            name: 'app',
            remotes: { mf: "mf@/mf.js" },
            shared
        })
    ]),
    header: merge([
        { entry: [path.join(__dirname, 'src', 'header.js')] },
        parts.federateModule({
            name: 'mf',
            filename: 'mf.js',
            exposes: { "./header": "./src/header" },
            shared
        })
    ])
}

if (!component) throw new Error('Missing component name')

module.exports = merge([commonConfig, config[mode], { mode }, componentConfig[component]])