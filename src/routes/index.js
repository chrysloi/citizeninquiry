const express = require('express');

const router = express.Router();

router.all('/*', (req, res) => {
  res.json({ error: { status: 404, message: 'Router not found' } });
});

module.exports = router;
