var Path = require("path");
var Webpack = require("webpack");
var WebpackConfig = require("webpack-configurator");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlPlugin = require("html-webpack-plugin");

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

function exposeResolver(config, name) {
    config.loader = (name + "?" + config.variables.join("!"));

    delete config.variables;
    
    return config;
}

module.exports = (function() {
    var config = new WebpackConfig();
    var rootPath = Path.join(__dirname, "..", "..");
    var outputPath = Path.join(rootPath, "dist", "dev");

    // Define general configuration.
    config.merge({
        entry: Path.join(__dirname, "app.entry.js"),
        output: {
            path: outputPath,
            filename: "bundle.js"
        },

        // Webpack Dev Server configuration.
        devServer: {
            port: 8080,
            host: "localhost",
            contentBase: outputPath,
            inline: true,
            stats: {
                chunkModules: false,
                colors: true
            }
        },
        
        resolve: {
            extensions: ["", ".js", ".jsx", ".scss", ".css"]
        },
        // Enable sourcemaps.
        devtool: "source-map"
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

    // Enable misc files to required.
    config.loader("url", {
        test: /\.(woff2?|ttf|eot|svg)$/
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

    config.loader("expose", {
        test: require.resolve("react"),
        variables: ["React"]
    }, exposeResolver);

    // Extract any CSS from bundle.js into a separate file (style.css).
    config.plugin("extract-text", ExtractTextPlugin, ["style.css"]);

    // Automagically generate a HTML once finished bundling.
    config.plugin("html", HtmlPlugin, [{
        title: "Word Counter",
        filename: "index.html",
        template: Path.join(rootPath, "src", "index.html"),
        inject: "body"
    }]);

    // Resolve the configuration in a structure Webpack understands.
    return config.resolve();
})();
