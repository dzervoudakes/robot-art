const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const eslintFormatter = require('eslint-friendly-formatter');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const config = require('../config');

const { PUBLIC_DIR } = config.directories;

Object.keys(common.entry).forEach(name => {
	common.entry[name] = ['./build/dev-client'].concat(common.entry[name]);
});

module.exports = merge(common, {
	mode: 'development',
	// module: {
	// 	rules: [{
	// 		test: /\.jsx?$/,
	// 		loader: 'eslint-loader',
	// 		enforce: 'pre',
	// 		include: path.resolve(__dirname, '..', 'src'),
	// 		options: {
	// 			formatter: eslintFormatter
	// 		}
	// 	}]
	// },
	plugins: [
		new webpack.EnvironmentPlugin(
			config.env.development
		),
		new HtmlWebpackPlugin({
			favicon: `${PUBLIC_DIR}/favicon.ico`,
			filename: 'index.html',
			template: `${PUBLIC_DIR}/index.html`,
			title: 'Robot Art'
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
