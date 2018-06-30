const path = require('path');

const resolve = (dir = '') => (
	path.resolve(__dirname, '../', dir)
);

module.exports = {
	directories: {
		APP_DIR: resolve('src'),
		BUILD_DIR: resolve('dist'),
		PUBLIC_DIR: resolve('public'),
		ROOT_DIR: resolve()
	},
	env: {
		development: {
			BABEL_ENV: 'development',
			NODE_ENV: 'development'
		},
		production: {
			BABEL_ENV: 'production',
			NODE_ENV: 'production'
		}
	}
};
