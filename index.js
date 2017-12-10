const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');

// @TODO: REDIRECT USERS WHO ARE LOGGED IN AWAY FROM THE LOGIN SCREEN
// (assumes manually changing the URL back to root)
// (there are also oddities with the back button... sigh)

// @TODO: MODULARIZE THIS FILE SOMEHOW!

// @TODO: EITHER...
// 1) FIGURE OUT ACTUAL SESSION, AUTH, SECURITY, ETC. FOR LOGINS
//    OR
// 2) ADD IN SOME COMMENT, SOMETHING IN THE README, ETC. ABOUT HOW
//    THIS WEB SECURITY IS JANK AND THAT YOU KNOW THIS WON'T FLY IN REAL LIFE

app.use(session({
    cookie: { maxAge: 3600000 },
    resave: false,
    saveUninitialized: true,
    secret: 'mondo-robot-secret-token',
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.all('/api/user', (req, res) => {
    if (req.method === 'POST') {
        if (req.body.action === 'login') {
            req.session.userLoggedIn = req.body.loggedIn;
            res.sendStatus(200);
        } else if (req.body.action === 'create_account') {
            const file = `${__dirname}/public/data/users.json`;
            jsonfile.writeFile(file, req.body.users, err => {
                if (!err) {
                    req.session.userLoggedIn = true;
                    res.redirect('/robots');
                    res.sendStatus(200);
                } else{
                    console.log(err);
                    res.sendStatus(500);
                }
            });
        }
    } else if (req.method === 'GET') {
        res.send({ userLoggedIn: req.session.userLoggedIn });
    }
});

app.post('/api/update-robots', (req, res) => {
    const file = `${__dirname}/public/data/robots.json`;
    jsonfile.writeFile(file, req.body, err => {
        if (!err) res.sendStatus(200);
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });
});

app.use((req, res) => {
    res.status(404);
    res.sendFile(path.join(__dirname, '/public/404.html'));
});

app.listen(3000, () => {
    console.log('robot-art booted up on port 3000');
});