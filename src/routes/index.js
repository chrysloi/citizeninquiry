const express = require('express');
const users = require('./user');
const categories = require('./category');
const cells = require('./cell');
const villages = require('./village');

const router = express.Router();

router.use('/users', users);
router.use('/category', categories);
router.use('/cell', cells);
router.use('/village', villages);

module.exports = router;
