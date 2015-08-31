var Commander  = require("commander");
var Webpack = require("webpack");

var compiler, config;

// Called once Webpack has done its thing.
// Note: This can be executed multiple times.
function onBundled(err, stats) {
    if (err)
        throw err;

    console.log(stats.toString({
        // Don't show chunk modules to reduce console spam.
        chunkModules: false,
        
        // Colours are cool.
        colors: true
    }));
}

// Define supported CLI options.
Commander
    .option("-w, --watch", "Watch for file changes")
    .option("-m, --mode [value]", "Build mode")
    .parse(process.argv);

// Require the given mode (fallbacks on the dev config).
config = require("./config/" + (Commander.mode || "dev") + "/webpack.config");
compiler = Webpack(config);

// Check if we have directly passed a watch option or defined it within the configuration object.
if (Commander.watch || config.watch) {
    compiler.watch({
        aggregateTimeout: 300
    }, onBundled);
} else {
    compiler.run(onBundled);
}
