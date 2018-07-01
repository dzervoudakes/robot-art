module.exports = () => {
	const webpack = require('webpack');
	const webpackConfig = require('./webpack.dev');
	const webpackDev = require('webpack-dev-middleware');
	const webpackHot = require('webpack-hot-middleware');
	const opn = require('opn');

	const compiler = webpack(webpackConfig);
	const port = process.env.port || 8080;

	const devMiddleware = webpackDev(compiler, {
		publicPath: '/',
		quiet: true
	});

	const hotMiddleware = webpackHot(compiler, {
		log: false,
		heartbeat: 2000
	});

	compiler.plugin('compilation', compilation => {
		compilation.plugin('html-webpack-plugin-after-emit', () => {
			hotMiddleware.publish({ action: 'reload' });
		});
	});

	devMiddleware.waitUntilValid(() => {
		const url = `http://localhost:${port}`;
		opn(url);
	});

	return {
		devMiddleware,
		hotMiddleware
	};
};
