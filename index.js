const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/public')));

app.get(['/robots', '/results'], (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
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