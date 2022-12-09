const userRoutes = require('../../controllers/user.controller');
const { Router } = require('express');

const router = Router();

router.get('/users', userRoutes.getUsers);
router.post('/signup', userRoutes.createUser);

module.exports = router;
