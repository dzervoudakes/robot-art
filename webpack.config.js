const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const APP_DIR = path.resolve(__dirname, 'src/app');
const BUILD_DIR = path.resolve(__dirname, 'public');

const config = {
    devtool: 'source-map',
    entry: `${APP_DIR}/index.jsx`,
    output: {
        path: BUILD_DIR,
        filename: 'js/app.min.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader')
            }
        ]
    },
    plugins: [
	    new ExtractTextPlugin('css/styles.min.css', {
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.min\.css$/,
            cssProcessorOptions: { discardComments: { removeAll: true } }
        }),
        new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                }
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin({
            asset: 'js/app.min.js.gz',
            algorithm: 'gzip',
            test: /\.js$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
};

module.exports = config;