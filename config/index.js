var WebpackConfig = require("webpack-configurator");

module.exports = function(Commander) {
    var webpackConfig = new WebpackConfig();
    var modes = ["base", Commander.mode];

    // Iterate over each mode passing the config and commander instances.
    var config = modes.reduce(function(config, mode) {
        var transform = require("./" + mode + "/webpack.config.js");

        transform(config, Commander);

        return config;
    }, webpackConfig);

    return config.resolve();
};
