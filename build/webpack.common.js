const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const APP_DIR = path.resolve(__dirname, '../src/app');

module.exports = {
	entry: `${APP_DIR}/index.jsx`,
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
	resolve: {
		extensions: ['.js', '.jsx', '.scss'],
		alias: { '@': APP_DIR }
	}
};