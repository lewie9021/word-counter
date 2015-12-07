var Path = require("path");
var Webpack = require("webpack");
var WebpackConfig = require("webpack-configurator");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlPlugin = require("html-webpack-plugin");

// A map of dependencies pre-compiled to improve compile time.
var dependencies = {
    "react": "react/dist/react.min.js",
    "react-bootstrap": "react-bootstrap/dist/react-bootstrap.min.js"
};

// Define how the sass-loader should be resolved.
function extractTextResolver(config) {
    // Build up a loader string.
    var loaders = Object.keys(config.loaders).map(function(name) {
        return name + "?" + JSON.stringify(config.loaders[name]);
    });

    config.loader = ExtractTextPlugin.extract(loaders.join("!"));
    
    // Clean up before resolving.
    delete config.loaders;

    // Return the correctly resolved sass-loader configuration.
    return config;
}

module.exports = function(config, Commander) {
    var buildMode = Commander.mode;
    var rootPath = Path.join(__dirname, "..", "..");
    var modulesPath = Path.join(rootPath, "node_modules");

    // Define general configuration.
    config.merge({
        entry: Path.join(__dirname, "..", buildMode, "app.entry.js"),
        
        output: {
            path: Path.join(rootPath, "dist", buildMode),
            filename: "bundle.js"
        },

        module: {
            noParse: Object.keys(dependencies).map(function(name) {
                return Path.resolve(modulesPath, dependencies[name]);
            })
        },
        
        resolve: {
            alias: Object.keys(dependencies).reduce(function(obj, name) {
                obj[name] = Path.resolve(modulesPath, dependencies[name]);

                return obj;
            }, {}),
            root: Path.join(rootPath, "src"),
            extensions: ["", ".js", ".jsx", ".scss", ".css"]
        }
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

    config.loader("sass", {
        test: /\.scss$/,
        include: Path.resolve(rootPath, "src", "sass"),
        loaders: {
            css: {},
            sass: {}
        }
    }, extractTextResolver);

    // Prevent react-bootstrap from complaining about 'require'.
    config.loader("imports-react-boostrap", {
        test: Path.resolve(modulesPath, dependencies["react-bootstrap"]),
        loader: "imports"
    });

    // Extract any CSS from bundle.js into a separate file (style.css).
    config.plugin("extract-text", ExtractTextPlugin, ["style.css"]);

    // Automagically generate a HTML once finished bundling.
    config.plugin("html", HtmlPlugin, [{
        title: "Word Counter",
        filename: "index.html",
        template: Path.join(rootPath, "src", "index.html"),
        inject: "body"
    }]);

    // Return the config object to be extended by a mode specific build file.
    return config;
};
