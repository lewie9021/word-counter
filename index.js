var FS = require("fs");
var Commander  = require("commander");
var Webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var getConfig = require("./config");

var config, compiler, server;

// Define supported CLI options.
Commander
    .option("-w, --watch", "Watch for file changes", false)
    .option("-m, --mode [value]", "Build mode", "dev")
    .option("-p, --profile", "Export a stats.json file", false)
    .parse(process.argv);

// Called once Webpack has done its thing.
// Note: This can be executed multiple times.
function onBundled(err, stats) {
    if (err)
        throw err;

    if (Commander.profile) {
        FS.writeFileSync("stats.json", JSON.stringify(stats.toJson(), null, 4));
        
        return console.log("Successfully exported the stats.json file.");
    }

    console.log(stats.toString({
        // Don't show chunk modules to reduce console spam.
        chunkModules: false,
        
        // Colours are cool.
        colors: true
    }));
}

config = getConfig(Commander);
compiler = Webpack(config);
    
// Check if we have directly passed a watch option or defined it within the configuration object.
if (!Commander.profile && (Commander.watch || config.watch)) {
    if (config.devServer) {
        server = new WebpackDevServer(compiler, config.devServer);

        // Print to console the port we're listening on.
        console.log("listening on", config.devServer.host + ":" + config.devServer.port);
        
        server.listen(config.devServer.port, config.devServer.host);
    } else {
        compiler.watch({
            aggregateTimeout: 300
        }, onBundled);
    }
} else {
    compiler.run(onBundled);
}
