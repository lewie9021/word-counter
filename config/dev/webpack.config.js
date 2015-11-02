var Path = require("path");

function exposeResolver(config, name) {
    config.loader = (name + "?" + config.variables.join("!"));

    delete config.variables;
    
    return config;
}

module.exports = function(config, Commander) {
    var buildMode = Commander.mode;
    var outputPath = Path.join(__dirname, "..", "..", "dist", buildMode);

    // Define general configuration.
    config.merge({
        // Enable sourcemaps.
        devtool: "eval-source-map",

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
        // TODO: This is a horrible hack. Implement a better method of retrieving this value.
        test: config._config.resolve.alias.react,
        query: "React"
    });

    // Return the config instance to be resolved.
    return config;
};
