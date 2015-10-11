var Path = require("path");
var Webpack = require("webpack");

module.exports = (function() {
    var config = require("../base/webpack.config.js")("live");
    var outputPath = Path.join(__dirname, "..", "..", "dist", "live");
    var UglifyJsPlugin = Webpack.optimize.UglifyJsPlugin;
    
    // Enable SASS syntax.
    config.loader("sass", {
        loaders: {
            css: {
                minimize: true
            },
            sass: {
                outputStyle: "compressed"
            }
        }
    });

    // Minify the JavaScript code.
    config.plugin("uglify-js", UglifyJsPlugin, [{
        compress: {
	    warnings: false
	}
    }]);
    
    // Resolve the configuration in a structure Webpack understands.
    return config.resolve();
})();
