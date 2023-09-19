const express = require('express');
const router = express.Router();
const AuthMiddleWare = require('../app/middlewares/auth');
const ArtistController = require('../app/controllers/ArtistController');

// Post new Artist
router.post(
    '/',
    AuthMiddleWare.verifyToken,
    AuthMiddleWare.isAdmin,
    ArtistController.createNewArtist,
);

// Get All Artist
router.get('/', ArtistController.getAllArtist);

// Get All Artist
router.get('/:id', ArtistController.getArtistById);

// Add to Favorite
router.put(
    '/addToFavorite/:id',
    [AuthMiddleWare.verifyToken],
    ArtistController.addToFavoriteByID,
);

// Edit Artist
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
