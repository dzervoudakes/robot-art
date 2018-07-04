const path = require('path');

const resolve = (dir = '') => (
	path.resolve(__dirname, '../', dir)
);

const setProcessVars = env => ({
	BABEL_ENV: env,
	NODE_ENV: env
});

module.exports = {
	paths: {
		APP_DIR: resolve('src'),
		BUILD_DIR: resolve('dist'),
		PUBLIC_DIR: resolve('public'),
		ROOT_DIR: resolve()
	},
	env: {
		development: setProcessVars('development'),
		production: setProcessVars('production')
	}
};
