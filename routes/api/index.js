const express = require('express');
const robotsRoute = require('./robots');
const usersRoute = require('./users');

const router = express.Router();

router.use('/robots', robotsRoute);
router.use('/users', usersRoute);

module.exports = router;
