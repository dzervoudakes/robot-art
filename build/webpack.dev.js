const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const config = require('../config');

const {
	APP_DIR,
	PUBLIC_DIR,
	ROOT_DIR
} = config.directories;

module.exports = merge(common, {
	entry: {
		app: ['./build/hot-client.js', `${APP_DIR}/index.jsx`]
	},
	mode: 'development',
	plugins: [
		new webpack.EnvironmentPlugin(
			config.env.development
		),
		new ExtractTextPlugin('css/[name].css', {
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			favicon: `${PUBLIC_DIR}/favicon.ico`,
			filename: 'index.html',
			template: `${PUBLIC_DIR}/index.html`,
			title: 'Robot Art'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin()
	],
	output: {
		path: ROOT_DIR,
		filename: 'js/[name].js'
	}
});
