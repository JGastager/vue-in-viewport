module.exports = {
    entry: "./src/in-viewport-plugin.js",
    output: {
        filename: "in-viewport.min.js",
        libraryTarget: "umd",
        library: "VueInViewport",
    },
    mode: "production",
    externals: {
        vue: "vue",
    },
};
