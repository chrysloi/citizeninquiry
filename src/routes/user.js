const userRoutes = require('../controllers/user.controller');
const { Router } = require('express');

const router = Router();

router.get('/', userRoutes.getUsers);
router.get('/userinfo', userRoutes.getUserInfo);
router.post('/login', userRoutes.loginUser);
router.post('/logout', userRoutes.logoutUser);
router.post('/createuser', userRoutes.createUser);
router.patch('/updateuser', userRoutes.updateUser);

module.exports = router;
