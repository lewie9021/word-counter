var Path = require("path");

function exposeResolver(config, name) {
    config.loader = (name + "?" + config.variables.join("!"));

    delete config.variables;
    
    return config;
}

module.exports = (function() {
    var config = require("../base/webpack.config.js")("dev");
    var outputPath = Path.join(__dirname, "..", "..", "dist", "dev");

    // Define general configuration.
    config.merge({
        // Enable sourcemaps.
        devtool: "source-map",
        
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
        }
    });
    
    // Enable SASS syntax.
    config.loader("sass", {
        loaders: {
            css: {sourceMap: true},
            sass: {sourceMap: true}
        }
    });

    config.loader("expose", {
        test: require.resolve("react"),
        variables: ["React"]
    }, exposeResolver);

    // Resolve the configuration in a structure Webpack understands.
    return config.resolve();
})();
