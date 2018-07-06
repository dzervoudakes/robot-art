const hotClient = require('webpack-hot-middleware/client');

hotClient.setOptionsAndConnect({
	path: '/__webpack_hmr',
	noInfo: true,
	reload: true,
	timeout: 20000
});
