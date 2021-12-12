const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/cloudflare-worker/index.ts",
    output: {
        filename: "worker.js",
        path: path.join(__dirname, "dist"),
        chunkFormat: "module",
    },
    devtool: "cheap-module-source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    // transpileOnly: true,
                },
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    sources: false,
                },
            },
        ],
    },
};
