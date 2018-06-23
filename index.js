const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const fallback = require('connect-history-api-fallback');
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.port || 8080;

global.__dirname = __dirname;

app.use(fallback());

// @TODO: AFTER RESTARTING SERVER, REFRESHING A PAGE
// STILL SHOWS THE ROUTE WITHOUT REDIRECT FOR LOGIN

app.use(session({
	cookie: { maxAge: 3600000 },
	resave: false,
	saveUninitialized: true,
	secret: 'robot-art-secret-token'
}));

if (process.env.NODE_ENV === 'development') {
	const webpack = require('webpack');
	const webpackConfig = require('./build/webpack.local');
	const webpackDev = require('webpack-dev-middleware');

	const compiler = webpack(webpackConfig);
	const devMiddleware = webpackDev(compiler, {
		publicPath: '/',
		quiet: true
	});

	app.use(devMiddleware);
}

if (process.env.NODE_ENV === 'production') {
	app.use((req, res) => {
		res.sendFile(path.join(__dirname, '/public/index.html'));
	});

	app.get(/vendor\.(.*)\.min\.js/, (req, res, next) => {
		req.url = `${req.url}.gz`;
		res.set('Content-Encoding', 'gzip');
		res.set('Content-Type', 'text/javascript');
		next();
	});
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// @TODO: API ROUTE WITH REDIRECT
app.get('/account/logout', (req, res) => {
	req.session.isUserLoggedIn = false;
	res.redirect('/');
});

app.use('/api', apiRoutes);
app.use(express.static(path.join(__dirname, '/public')));

app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`robot-art booted up on port ${port}`);
});
