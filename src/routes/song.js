const express = require('express');
const router = express.Router();
const AuthMiddleWare = require('../app/middlewares/auth');
const SongController = require('../app/controllers/SongController');

// Create Song
router.post(
    '/',
    [AuthMiddleWare.verifyToken, AuthMiddleWare.isAdmin],
    SongController.createSong,
);

// Edit Song
router.put(
    '/edit/:id',
    [AuthMiddleWare.verifyToken, AuthMiddleWare.isAdmin],
    SongController.editSong,
);

// Deleted Song
router.delete(
    '/deleted/:id',
    [AuthMiddleWare.verifyToken, AuthMiddleWare.isAdmin],
    SongController.deletedSong,
);

// Get All Song
router.get('/', SongController.getAllSong);

// Get Song by ID
router.get(
    '/:id',
    [AuthMiddleWare.verifyCanAccessWithoutToken],
    SongController.getSongById,
);

// Like Song
router.put(
    '/like/:id',
    [AuthMiddleWare.verifyToken],
    SongController.likeSongById,
);

// Dislike Song
router.put(
    '/dislike/:id',
    [AuthMiddleWare.verifyToken],
    SongController.dislikeSongById,
);

// Save on Favorite
router.put(
    '/favorite/:id',
    [AuthMiddleWare.verifyToken],
    SongController.saveOnFavorite,
);

// Export
module.exports = router;
