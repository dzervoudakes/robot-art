const webpack = require('webpack');
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');
const opn = require('opn');
const webpackConfig = require('./webpack.dev');

const compiler = webpack(webpackConfig);
const port = process.env.port || 8080;

const devMiddleware = webpackDev(compiler, {
	logLevel: 'warn',
	publicPath: '/'
});

const hotMiddleware = webpackHot(compiler, {
	log: false,
	heartbeat: 2000
});

devMiddleware.waitUntilValid(() => {
	const url = `http://localhost:${port}`;
	opn(url);
});

module.exports = {
	devMiddleware,
	hotMiddleware
};
