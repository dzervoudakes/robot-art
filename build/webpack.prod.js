const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const config = require('../config');

const {
	build: BUILD_DIR,
	public: PUBLIC_DIR,
	root: ROOT_DIR
} = config.directories;

const webpackConfig = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	performance: {
		hints: false
	},
	plugins: [
		new webpack.EnvironmentPlugin(
			config.env.production
		),
		new CleanWebpackPlugin(['dist'], {
			root: ROOT_DIR
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[chunkhash].min.css'
		}),
		new OptimizeCssAssetsPlugin(),
		new UglifyJsPlugin({
			sourceMap: true
		}),
		new webpack.optimize.AggressiveMergingPlugin(),
		new CopyWebpackPlugin([
			{ from: `${ROOT_DIR}/index.js`, to: `${BUILD_DIR}/index.js` },
			{ from: `${ROOT_DIR}/routes`, to: `${BUILD_DIR}/routes` },
			{ from: `${ROOT_DIR}/public`, to: `${BUILD_DIR}/public`, ignore: ['.*'] }
		]),
		new HtmlWebpackPlugin({
			favicon: `${PUBLIC_DIR}/favicon.ico`,
			filename: 'index.html',
			template: `${PUBLIC_DIR}/index.html`,
			title: config.title,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			},
			chunksSortMode: 'dependency'
		})
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /node_modules/,
					name: 'vendor',
					chunks: 'all'
				}
			}
		},
		runtimeChunk: {
			name: 'manifest'
		}
	},
	output: {
		path: `${BUILD_DIR}/public`,
		filename: 'js/[name].[chunkhash].min.js',
		sourceMapFilename: 'js/[name].[chunkhash].min.map',
		chunkFilename: 'js/[name].[chunkhash].min.js'
	}
});

if (process.env.npm_config_report) {
	const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
	webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
