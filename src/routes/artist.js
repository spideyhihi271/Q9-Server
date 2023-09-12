const express = require('express');
const router = express.Router();
const AuthMiddleWare = require('../app/middlewares/auth');
const ArtistController = require('../app/controllers/ArtistController');

// Post new Category
router.post(
    '/',
    AuthMiddleWare.verifyToken,
    AuthMiddleWare.isAdmin,
    ArtistController.createNewArtist,
);

// Get All Category
router.get('/', ArtistController.getAllArtist);

// Edit Category
router.put(
    '/edit/:id',
    [AuthMiddleWare.verifyToken, AuthMiddleWare.isAdmin],
    ArtistController.editArtistById,
);

// Deleted
router.delete(
    '/deleted/:id',
    [AuthMiddleWare.verifyToken, AuthMiddleWare.isAdmin],
    ArtistController.deletedArtistById,
);

// Export
module.exports = router;
