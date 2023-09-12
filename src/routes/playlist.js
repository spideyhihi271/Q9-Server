const express = require('express');
const router = express.Router();
const AuthMiddleWare = require('../app/middlewares/auth');
const PlaylistController = require('../app/controllers/PlaylistController');

// Get Playlist
router.get('/', PlaylistController.getAllPlaylist);

// Get Playlist by ID
router.get(
    '/:id',
    [AuthMiddleWare.verifyCanAccessWithoutToken],
    PlaylistController.getPlaylistById,
);

// Create new playlist
router.post(
    '/',
    [AuthMiddleWare.verifyToken],
    PlaylistController.createPlaylist,
);

// Add Song
router.put(
    '/addSong/:id',
    [AuthMiddleWare.verifyToken],
    PlaylistController.addSongToPlaylist,
);

// Edit Playlist
router.put(
    '/edit/:id',
    [AuthMiddleWare.verifyToken],
    PlaylistController.editPlaylist,
);

// Deleted Playlist
router.delete(
    '/deleted/:id',
    [AuthMiddleWare.verifyToken],
    PlaylistController.deletedPlaylist,
);

// Save on favorite Playlist
router.put(
    '/favorite/:id',
    [AuthMiddleWare.verifyToken],
    PlaylistController.saveOnFavorite,
);

// Export
module.exports = router;
