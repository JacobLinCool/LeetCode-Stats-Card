module.exports = {
    context: __dirname,
    entry: "./index.js",
    mode: "production",
    target: "webworker",
    optimization: {
        minimize: true,
    },
};
