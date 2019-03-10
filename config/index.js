const path = require('path');

const resolve = dir => (
	path.resolve(__dirname, '..', dir)
);

const setProcessVars = env => ({
	BABEL_ENV: env,
	NODE_ENV: env
});

module.exports = {
	directories: {
		app: resolve('src'),
		build: resolve('dist'),
		public: resolve('public'),
		root: resolve('')
	},
	env: {
		development: setProcessVars('development'),
		production: setProcessVars('production')
	},
	isDevelopment: process.argv.indexOf('--development') !== -1,
	title: 'Robot Art'
};
