const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('../config');

const { APP_DIR, PUBLIC_DIR } = config.directories;

module.exports = {
	entry: {
		app: `${APP_DIR}/index.jsx`
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				include: APP_DIR,
				loader: 'babel-loader'
			},
			{
				test: /\.(sass|scss)$/,
				include: APP_DIR,
				loader: ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader')
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'img/[name].[hash:7].[ext]'
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.scss'],
		alias: {
			'@': APP_DIR,
			'@public': PUBLIC_DIR
		}
	}
};
