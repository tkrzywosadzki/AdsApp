const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../utils/authMiddleware')
const imageUpload = require('../utils/imageUpload');

router.post('/register', imageUpload.single('avatar') , AuthController.postRegister);
router.post('/login', AuthController.postLogin);
router.get('/user', authMiddleware , AuthController.getUser);
router.delete('/logout', authMiddleware, AuthController.deleteLogout );

module.exports = router;