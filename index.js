const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
const chalk = require('chalk');
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.port || 8080;
const isDevelopment = process.argv.indexOf('--development') !== -1;

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

if (isDevelopment) {
	const middleware = require('./build/dev-middleware');
	const { devMiddleware, hotMiddleware } = middleware;

	app.use(devMiddleware);
	app.use(hotMiddleware);
} else {
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
	console.log(chalk.cyan(`robot-art server booted up on port ${port}`));
});
