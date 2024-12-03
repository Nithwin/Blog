const express = require('express');
const { signup, login, getProfile, updateProfile } = require('../controllers/authController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authenticateUser, getProfile);
router.put('/profile', authenticateUser, updateProfile);  // Add the PUT route for updating profile

module.exports = router;
