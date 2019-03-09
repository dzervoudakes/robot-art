const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');
const config = require('../config');

const { public: PUBLIC_DIR } = config.directories;

Object.keys(baseWebpackConfig.entry).forEach(name => {
	baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	plugins: [
		new webpack.EnvironmentPlugin(
			config.env.development
		),
		new HtmlWebpackPlugin({
			favicon: `${PUBLIC_DIR}/favicon.ico`,
			filename: 'index.html',
			template: `${PUBLIC_DIR}/index.html`,
			title: config.title
		}),
		new webpack.HotModuleReplacementPlugin(),
		new FriendlyErrorsPlugin()
	],
	optimization: {
		noEmitOnErrors: true,
		namedModules: true
	},
	output: {
		path: PUBLIC_DIR,
		filename: 'js/[name].js'
	}
});
