const { Router } = require('express');
const villages = require('../controllers/village.controller');

const router = Router();

router.get('/', villages.getVillages);
router.post('/', villages.createVillage);
router.patch('/:villageId', villages.updateVillage);

module.exports = router;
