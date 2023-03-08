const express = require('express');
const router = express.Router();
const { userValidator, tokenValidator } = require('../middlewares/auth.validator');
const { createUser, loginUser, validateHandler } = require('../controllers/authController');

router.post('/user/create', userValidator, createUser);
router.post('/user/login', userValidator, loginUser);
router.post('/token/validate', tokenValidator, validateHandler);
module.exports = router;