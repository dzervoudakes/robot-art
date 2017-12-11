const express = require('express');
const router = express.Router();
const robotsRoute = require('./robots');
const usersRoute = require('./users');

router.use('/robots', robotsRoute);
router.use('/users', usersRoute);

module.exports = router;