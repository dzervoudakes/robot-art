const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

const PUBLIC_DIR = path.resolve(__dirname, '../public');
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
			favicon: `${PUBLIC_DIR}/favicon.ico`,
			filename: 'index.html',
			template: `${PUBLIC_DIR}/index.html`,
			title: 'Robot Art'
		})
	],
	output: {
		path: ROOT_DIR,
		filename: 'js/[name].js'
	}
});
