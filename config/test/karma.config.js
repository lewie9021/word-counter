module.exports = function(config) {
    config.set({
        // Run in Chrome and Internet Explorer.
        browsers: [
            "Chrome",
            "IE"
        ], 

        singleRun: false,
        
        files: [
            "app.entry.js"
        ],

        preprocessors: {
            // Process the entry file first with Webpack to resolve dependencies. To maintain source file references, we
            // use the sourcemap plugin.
            "app.entry.js": [
                "webpack",
                "sourcemap"
            ]
        },
        
        frameworks: [
            "mocha",
            "chai",
            "chai-sinon"
        ],
        
        reporters: [
            "mocha"
        ],
        
        webpack: require("./webpack.config"),

        webpackMiddleware: {
            noInfo: true
        },

        plugins: [
            // Allow support for Webpack with Karma.
            require("karma-webpack"),

            // Enable the Mocha testing framework and reporter.
            require("karma-mocha"),
            require("karma-mocha-reporter"),

            // Enable Chai and Sinon.
            require("karma-chai"),
            require("karma-chai-sinon"),
            
            // MAke source mapping work correctly.
            require("karma-sourcemap-loader"),
            require("karma-source-map-support"),

            // Launcher for Chrome and Chrome Canary.
            require("karma-chrome-launcher"),
            require("karma-ie-launcher")
        ]
    });
};
