const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '../public');

module.exports = merge(common, {
	plugins: [
		new ExtractTextPlugin('css/styles.css', {
			allChunks: true
		})
	],
	output: {
		path: BUILD_DIR,
		filename: 'js/app.js'
	}
});