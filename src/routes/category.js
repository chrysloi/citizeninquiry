const { Router } = require('express');
const category = require('../controllers/category.controller');

const router = Router();

router.get('/', category.getCategories);
router.post('/', category.createCategory);
router.patch('/:categoryId', category.updateCategory);
router.delete('/:categoryId', category.deleteCategory);

module.exports = router;
