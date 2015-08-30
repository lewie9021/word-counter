var Path = require("path");
var Webpack = require("webpack");
var WebpackConfig = require("webpack-configurator");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// Define how the sass-loader should be resolved.
function extractTextResolver(config) {
    // Build up a loader string.
    var loaders = config.loaders.map(function(loader) {
        return loader.name + "?" + JSON.stringify(loader.query);
    });

    config.loader = ExtractTextPlugin.extract(loaders.join("!"));
    
    // Clean up before resolving.
    delete config.loaders;

    // Return the correctly resolved sass-loader configuration.
    return config;
}

module.exports = (function() {
    var config = new WebpackConfig();
    var srcPath = Path.join(__dirname, "src");

    // Define general configuration.
    config.merge({
        entry: Path.join(srcPath, "main.js"),
        output: {
            path: Path.join(__dirname, "dist"),
            filename: "bundle.js"
        },
        // Enable sourcemaps.
        devtool: "source-map"
    });

    // Enable ES6 & JSX syntax.
    config.loader("babel", {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        query: {
            optional: ["runtime"]
        }
    });

    // Enable SASS syntax.
    config.loader("sass", {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [{
            name: "css",
            query: {
                sourceMap: true
            }
        },
        {
            name: "sass",
            query: {
                sourceMap: true
            }
        }]
    }, extractTextResolver);

    config.plugin("extract-text", ExtractTextPlugin, ["style.css"]);

    // Resolve the configuration in a structure Webpack understands.
    return config.resolve();
})();
