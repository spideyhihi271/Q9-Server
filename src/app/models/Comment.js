const mongoose = require('mongoose');
const Joi = require('joi');

const commentSchema = new mongoose.Schema(
    {
        owner: { type: String, require: true },
        songId: { type: String, require: true },
        content: { type: String, require: true },
        likes: { type: [String], require: true, default: [] },
        dislike: { type: [String], require: true, default: [] },
        reply: { type: String, require: true },
        deleted: { type: Boolean, require: true, default: false },
    },
    { timestamps: true },
);

// Validator
const validate = (comment) => {
    const Schema = Joi.object({
        owner: Joi.string().required(),
        songId: Joi.string().required(),
        content: Joi.string().required(),
        reply: Joi.string(),
    });
    return Schema.validate(comment);
};

// Create Model
const Comment = mongoose.model('Comment', commentSchema);

// Export
module.exports = { Comment, validate };
