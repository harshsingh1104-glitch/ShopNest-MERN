const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { productManager } = require('../middleware/adminMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.route('/').get(getProducts).post(protect, productManager, upload.single('image'), createProduct);
router.route('/:id').get(getProductById).put(protect, productManager, upload.single('image'), updateProduct).delete(protect, productManager, deleteProduct);

module.exports = router;
