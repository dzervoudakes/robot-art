const express = require('express');
const jsonfile = require('jsonfile');

const router = express.Router();

router.get('/', (req, res) => {
	const file = `${global.__dirname}/public/data/users.json`;
	if (req.query.full) {
		jsonfile.readFile(file, (err, obj) => {
			if (!err) res.send(obj);
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
		});
	} else {
		res.send({ isUserLoggedIn: req.session.isUserLoggedIn });
	}
});

router.post('/', (req, res) => {
	const file = `${global.__dirname}/public/data/users.json`;
	if (req.body.action === 'login') {
		req.session.isUserLoggedIn = req.body.loggedIn;
		res.sendStatus(200);
	} else if (req.body.action === 'create_account') {
		jsonfile.writeFile(file, req.body.users, err => {
			if (!err) {
				req.session.isUserLoggedIn = true;
				res.sendStatus(200);
			} else {
				console.log(err);
				res.sendStatus(500);
			}
		});
	}
});

module.exports = router;