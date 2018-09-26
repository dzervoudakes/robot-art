const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config');

const { APP_DIR } = config.directories;

module.exports = {
	entry: {
		app: `${APP_DIR}/index.jsx`
	},
	module: {
		rules: [{
			test: /\.jsx?/,
			include: APP_DIR,
			loader: 'babel-loader'
		},
		{
			test: /\.(sa|sc|c)ss$/,
			include: APP_DIR,
			use: process.env.NODE_ENV === 'development' ?
				['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] :
				[MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
		},
		{
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: 'img/[name].[hash:7].[ext]'
			}
		},
		{
			test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: 'media/[name].[hash:7].[ext]'
			}
		},
		{
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: 'fonts/[name].[hash:7].[ext]'
			}
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
		alias: { '@': APP_DIR }
	}
};
