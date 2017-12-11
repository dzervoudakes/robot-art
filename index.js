const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

// @TODO: MAKE SURE YOU'RE HAPPY WITH README INFO; MAYBE PROVIDE A LITTLE EXTRA INFO ON THE IMPLEMENTATION

// @TODO: EITHER...
// 1) FIGURE OUT ACTUAL SESSION, AUTH, SECURITY, ETC. FOR LOGINS
//    OR
// 2) ADD IN SOME COMMENT, SOMETHING IN THE README, ETC. ABOUT HOW
//    THIS WEB SECURITY IS JANK AND THAT YOU KNOW THIS WON'T FLY IN REAL LIFE

global.__dirname = __dirname;

app.use(session({
    cookie: { maxAge: 3600000 },
    resave: false,
    saveUninitialized: true,
    secret: 'mondo-robot-secret-token',
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.get(['/', '/admin', '/create-account', '/results', '/robots'], (req, res) => {
    const sessData = req.session;
    if (sessData.userLoggedIn !== true && req.url !== '/create-account') return res.redirect('/');
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/account/logout', (req, res) => {
    req.session.userLoggedIn = false;
    res.redirect('/');
});

app.use('/api', apiRoutes);

app.use((req, res) => {
    res.status(404);
    res.sendFile(path.join(__dirname, '/public/404.html'));
});

app.listen(3000, () => {
    console.log('robot-art booted up on port 3000');
});