const devClient = require('webpack-hot-middleware/client');

devClient.setOptionsAndConnect({
	path: '/__webpack_hmr',
	noInfo: true,
	reload: true,
	timeout: 20000
});
