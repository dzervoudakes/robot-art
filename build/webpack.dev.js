const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const config = require('../config');

const { APP_DIR, PUBLIC_DIR, ROOT_DIR } = config.paths;

module.exports = merge(common, {
	entry: {
		app: ['./build/hot-client', `${APP_DIR}/index.jsx`]
	},
	mode: 'development',
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
		path: ROOT_DIR,
		filename: 'js/[name].js'
	}
});
