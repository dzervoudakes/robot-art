const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.port || 8080;

global.__dirname = __dirname;

app.use(session({
	cookie: { maxAge: 3600000 },
	resave: false,
	saveUninitialized: true,
	secret: 'robot-art-secret-token',
}));

app.get(/vendor\.(.*)\.min\.js/, (req, res, next) => {
	req.url = `${req.url}.gz`;
	res.set('Content-Encoding', 'gzip');
	res.set('Content-Type', 'text/javascript');
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.get(['/', '/admin', '/create-account', '/results', '/robots'], (req, res) => {
	const sessData = req.session;
	if (sessData.isUserLoggedIn !== true && req.url !== '/create-account') return res.redirect('/');
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/account/logout', (req, res) => {
	req.session.isUserLoggedIn = false;
	res.redirect('/');
});

app.use('/api', apiRoutes);

app.use((req, res) => {
	res.status(404);
	res.sendFile(path.join(__dirname, '/public/404.html'));
});

app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`robot-art booted up on port ${port}`);
});
