var Path = require("path");

module.exports = (function() {
    var config = require("../base/webpack.config.js")("test");

    // Define general configuration.
    config.merge({
        // Enable sourcemaps.
        devtool: "inline-source-map"
    });

    config.removeLoader("sass");
    config.removeLoader("url");
    config.removePlugin("extract-text");

    // Resolve the configuration in a structure Webpack understands.
    return config.resolve();
})();
