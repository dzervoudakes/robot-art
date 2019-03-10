const webpack = require('webpack');
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');
const ora = require('ora');
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

const spinner = ora('Compiling for development...');
spinner.start();

devMiddleware.waitUntilValid(() => {
	spinner.stop();
	const url = `http://localhost:${port}`;
	opn(url);
});

module.exports = {
	devMiddleware,
	hotMiddleware
};
