const { Comment, validate } = require('../models/Comment');
const { User } = require('../models/User');
const formatData = require('../../utils/formatData');
const filter = require('../../utils/filterData');

class CommentController {
    // Get Comment
    async getCommentByIdSong(req, res) {
        let comments = await Comment.find({
            songId: req.params.idSong,
            deleted: false,
        });

        let users = await User.find();

        // Format Data
        comments = formatData.forComment(comments, users);
        comments = filter.forComment(req, comments);
        return res.status(200).send({ data: comments });
    }
    // Post new comment
    async createComment(req, res) {
        let comment = {
            ...req.body,
            songId: req.params.idSong,
            owner: req.user._id,
        };
        const { error } = validate(comment);
        // Validator
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        // Saving
        const newComment = await new Comment(comment).save();

        return res
            .status(200)
            .send({ data: newComment, message: 'Your comment was uploaded!' });
    }

    // Post reply comment
    async replyComment(req, res) {
        // Check target
        const targetReply = await Comment.findById(req.params.id);

        if (!targetReply)
            return res.status(400).send({
                message: 'Cannot reply to comments that do not exist',
            });

        // No reply reply
        if (targetReply.reply)
            return res.status(400).send({
                message: 'Cannot reply this comments',
            });

        // Validator
        let comment = {
            ...req.body,
            songId: targetReply.songId,
            owner: req.user._id,
            reply: req.params.id,
        };
        const { error } = validate(comment);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        // Saving
        const replyData = await new Comment(comment).save();
        return res
            .status(200)
            .send({ data: replyData, message: 'Your comment was uploaded!' });
    }

    // Edit Comment
    async editComment(req, res) {
        let comment = await Comment.findById(req.params.id);
        // Check esxit
        if (!comment)
            return res.status(400).send({
                message: 'Cannot edit to comments that do not exist',
            });

        // Check owner
        if (comment.owner != req.user._id)
            return res.status(403).send({
                message:
                    'Access is denied. You do not have access to this content',
            });

        // Saving
        comment = Object.assign(comment, req.body);
        const updateData = await Comment.findByIdAndUpdate(
            req.params.id,
            comment,
        );

        return res
            .status(200)
            .send({ data: comment, message: 'Your comment was edited!' });
    }

    // Likes Comment
    async likeComment(req, res) {
        let comment = await Comment.findById(req.params.id);
        // Check esxit
        if (!comment)
            return res.status(400).send({
                message: 'Cannot edit to comments that do not exist',
            });

        // Check dislike
        comment.dislike = comment.dislike.filter(
            (item) => item != req.user._id,
        );
        comment.likes.push(req.user._id);

        // Saving
        const newData = await Comment.findByIdAndUpdate(req.params.id, comment);

        return res
            .status(200)
            .send({ data: comment, message: 'Your comment was liked!' });
    }

    // Dislike Comment
    async dislikeComment(req, res) {
        let comment = await Comment.findById(req.params.id);
        // Check esxit
        if (!comment)
            return res.status(400).send({
                message: 'Cannot edit to comments that do not exist',
            });

        // Check dislike
        comment.likes = comment.likes.filter((item) => item != req.user._id);
        comment.dislike.push(req.user._id);

        // Saving
        const newData = await Comment.findByIdAndUpdate(req.params.id, comment);

        return res
            .status(200)
            .send({ data: comment, message: 'Your comment was dislike!' });
    }

    // Deleted Comment
    async deletedComment(req, res) {
        let comment = await Comment.findById(req.params.id);
        // Check esxit
        if (!comment)
            return res.status(400).send({
                message: 'Cannot delete to comments that do not exist',
            });

        // Check owner
        if (comment.owner != req.user._id)
            return res.status(403).send({
                message:
                    'Access is denied. You do not have access to this content',
            });

        // Deleted Reply
        let replyComments = await Comment.find({ reply: req.params.id });
        replyComments.map(async (comment) => {
            comment.deleted = true;
            await Comment.findByIdAndUpdate(comment._id, comment);
        });

        // Deleted Target
        comment.deleted = true;
        comment = await Comment.findByIdAndUpdate(comment._id, comment);

        return res
            .status(200)
            .send({ data: comment, message: 'Your comment was deleted!' });
    }
}

module.exports = new CommentController();
