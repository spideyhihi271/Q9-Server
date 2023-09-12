const express = require('express');
const router = express.Router();
const AuthMiddleWare = require('../app/middlewares/auth');
const UserController = require('../app/controllers/UserController');

// Get Info
router.get('/info', [AuthMiddleWare.verifyToken], UserController.getData);

// Get Likes Song
router.get('/likes', [AuthMiddleWare.verifyToken], UserController.getLikeSong);

// Get History Song
router.get(
    '/history/song',
    [AuthMiddleWare.verifyToken],
    UserController.getHistorySong,
);

// Get History Playlist
router.get(
    '/history/playlist',
    [AuthMiddleWare.verifyToken],
    UserController.getHistoryPlaylist,
);

// Get My Playlist
router.get(
    '/myplaylist',
    [AuthMiddleWare.verifyToken],
    UserController.getMyPlaylist,
);

// Get Favorite Song
router.get(
    '/favorite/song',
    [AuthMiddleWare.verifyToken],
    UserController.getFavoriteSong,
);

// Get Favorite playlist
router.get(
    '/favorite/playlist',
    [AuthMiddleWare.verifyToken],
    UserController.getFavoritePlaylist,
);

// Export
module.exports = router;
