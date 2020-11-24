const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const minimatch = require('minimatch');

class MiniCssExtractPluginCleanup {
    apply(compiler) {
        compiler.hooks.emit.tapAsync("MiniCssExtractPluginCleanup", (compilation, callback) => {
            Object.keys(compilation.assets)
                .filter(asset => {
                    return [
                            "css/**/*.js", 
                            "css/**/*.js.map", 
                            "assets.js", 
                            "assets.js.map"
                    ].some(pattern => {
                        return minimatch(asset, pattern);
                    });
                })
                .forEach(asset => {
                    delete compilation.assets[asset];
                });

            callback();
        });
    }
}

module.exports = {
    mode: "development",
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    entry: {
        "js/indexjs": "./src/js/indexjs.js",
        "js/indexts": "./src/ts/indexts.ts",
        "js/indextsx": "./src/tsx/indextsx.tsx",
        "css/indexscss": "./src/sass/index.scss",
        "css/cssfile": "./src/css/cssfile.css",
        assets: "./copyfiles.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [ 
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: "file-loader",
                options: {
                    outputPath: "assets/imgs",
                    name: "[name].[ext]"
                }
            },
            {
                test: /\.(ico|html?)$/i,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]"
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            linkType: "text/css",
            filename: "[name].css"
        }),
        new MiniCssExtractPluginCleanup()
    ]
}