const express = require('express');
const router = express.Router();
const AuthMiddleWare = require('../app/middlewares/auth');
const CommentController = require('../app/controllers/CommentController');

// Get Comment
router.get('/:idSong', CommentController.getCommentByIdSong);

// Create new Comment
router.post(
    '/:idSong',
    [AuthMiddleWare.verifyToken],
    CommentController.createComment,
);

// Reply Comment
router.post(
    '/reply/:id',
    [AuthMiddleWare.verifyToken],
    CommentController.replyComment,
);

// Edit Comment
router.put(
    '/edit/:id',
    [AuthMiddleWare.verifyToken],
    CommentController.editComment,
);

// Likes Commet
router.put(
    '/like/:id',
    [AuthMiddleWare.verifyToken],
    CommentController.likeComment,
);

// dislikes Commet
router.put(
    '/dislike/:id',
    [AuthMiddleWare.verifyToken],
    CommentController.dislikeComment,
);

// Deleted Comment
router.delete(
    '/deleted/:id',
    [AuthMiddleWare.verifyToken],
    CommentController.deletedComment,
);

// Export
module.exports = router;
