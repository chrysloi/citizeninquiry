const express = require('express');
const users = require('./user');
const categories = require('./category');
const cells = require('./cell');
const villages = require('./village');
const inquiries = require('./inquiry');
const comments = require('./comment');

const router = express.Router();

router.use('/users', users);
router.use('/category', categories);
router.use('/cell', cells);
router.use('/village', villages);
router.use('/inquiry', inquiries);
router.use('/comments', comments);

module.exports = router;
