const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.port || 8080;

global.__dirname = __dirname;

app.use(history());

// @TODO: AFTER RESTARTING SERVER, REFRESHING A PAGE
// STILL SHOWS THE ROUTE WITHOUT REDIRECT FOR LOGIN

app.use(session({
	cookie: { maxAge: 3600000 },
	resave: false,
	saveUninitialized: true,
	secret: 'robot-art-secret-token'
}));

if (process.env.NODE_ENV === 'development') {
	const middleware = require('./build/dev-middleware');
	const { devMiddleware, hotMiddleware } = middleware;

	app.use(devMiddleware);
	app.use(hotMiddleware);
}

if (process.env.NODE_ENV === 'production') {
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '/public/index.html'));
	});
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// @TODO: API ROUTE WITH REDIRECT
app.use('/account/logout', (req, res) => {
	req.session.isUserLoggedIn = false;
	res.redirect('/');
});

app.use('/api', apiRoutes);
app.use(express.static(path.join(__dirname, '/public')));

app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`robot-art booted up on port ${port}`);
});
