const express = require('express');
const protectedRoutes = require('./protected');
const router = express.Router();

router.use('/protected', protectedRoutes);

module.exports = router;
