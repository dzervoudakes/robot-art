const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '../public');
const ROOT_DIR = path.resolve(__dirname, '../');

module.exports = merge(common, {
	mode: 'development',
	plugins: [
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'development'
		}),
		new ExtractTextPlugin('css/[name].css', {
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			favicon: `${BUILD_DIR}/favicon.ico`,
			filename: 'index.html',
			template: `${ROOT_DIR}/build/templates/template.html`,
			title: 'Robot Art'
		})
	],
	watchOptions: {
		ignored: [BUILD_DIR]
	},
	output: {
		path: BUILD_DIR,
		filename: 'js/[name].js'
	}
});