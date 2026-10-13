const express = require('express');
const { registerUser, loginUser, getUsers, setProductManager } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', protect, admin, getUsers);
router.put('/users/:id/product-manager', protect, admin, setProductManager);

module.exports = router;
