const express = require('express');
const protectedRoutes = require('./protected');
const users = require('./user/index');

const router = express.Router();

router.use('/users', users);

module.exports = router;
