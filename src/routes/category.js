const express = require('express');
const router = express.Router();
const AuthMiddleWare = require('../app/middlewares/auth');
const CategoryController = require('../app/controllers/CategoryController');

// Post new Category
router.post(
    '/',
    AuthMiddleWare.verifyToken,
    AuthMiddleWare.isAdmin,
    CategoryController.createCategory,
);

// Get All Category
router.get('/', CategoryController.getAllCategory);

// Edit Category
router.put(
    '/edit/:id',
    [AuthMiddleWare.verifyToken, AuthMiddleWare.isAdmin],
    CategoryController.editCategory,
);

// Deleted
router.delete(
    '/deleted/:id',
    [AuthMiddleWare.verifyToken, AuthMiddleWare.isAdmin],
    CategoryController.deletedCategory,
);

// Export
module.exports = router;
