const { Router } = require('express');
const cell = require('../controllers/cell.controller');

const router = Router();

router.get('/', cell.getCells);
router.post('/', cell.createCell);
router.patch('/:cellId', cell.updateCell);

module.exports = router;
