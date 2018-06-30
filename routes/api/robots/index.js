const express = require('express');
const jsonfile = require('jsonfile');
const formidable = require('express-formidable');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
	const file = `${global.__dirname}/public/data/robots.json`;
	jsonfile.readFile(file, (err, obj) => {
		if (!err) res.send(obj);
		if (err) {
			console.log(err);
			res.sendStatus(500);
		}
	});
});

// @TODO: '/update' ???
router.post('/', (req, res) => {
	const file = `${global.__dirname}/public/data/robots.json`;
	jsonfile.writeFile(file, req.body.robots, err => {
		if (!err) res.sendStatus(200);
		if (err) {
			console.log(err);
			res.sendStatus(500);
		}
	});
});

router.use(formidable());

router.post('/add', (req, res) => {
	const file = `${global.__dirname}/public/data/robots.json`;
	const { robots } = req.fields;
	jsonfile.writeFile(file, JSON.parse(robots), () => {
		const { name, path } = req.files.uploadFile;
		const newPath = `${global.__dirname}/public/img/robots/contenders/${name}`;
		fs.copyFile(path, newPath, err => {
			if (!err) res.sendFile(newPath);
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
		});
	});
});

module.exports = router;
