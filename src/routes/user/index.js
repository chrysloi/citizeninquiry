const userRoutes = require('../../controllers/user.controller');
const { Router } = require('express');

const router = Router();

router.get('/', userRoutes.getUsers);
router.post('/login', userRoutes.loginUser);
router.post('/createuser', userRoutes.createUser);

module.exports = router;
