var Path = require("path");
var Webpack = require("webpack");
var WebpackConfig = require("webpack-configurator");

module.exports = (function() {
    var config = new WebpackConfig();
    var rootPath = Path.join(__dirname, "..", "..");

    // Define general configuration.
    config.merge({
        entry: Path.join(__dirname, "app.entry.js"),
        output: {
            path: Path.join(rootPath, "dist", "test"),
            filename: "bundle.js"
        },
        resolve: {
            extensions: ["", ".js", ".jsx"]
        },
        // Enable sourcemaps.
        devtool: "inline-source-map"
    });

    // Enable ES6 & JSX syntax.
    config.loader("babel", {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        query: {
            optional: [
                "runtime",
                "es7.classProperties"
            ]
        }
    });

    // Resolve the configuration in a structure Webpack understands.
    return config.resolve();
})();
