const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const config = require('../config');

const { PUBLIC_DIR, ROOT_DIR } = config.directories;

module.exports = merge(common, {
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
		new webpack.NoEmitOnErrorsPlugin()
	],
	output: {
		path: ROOT_DIR,
		filename: 'js/[name].js'
	}
});
