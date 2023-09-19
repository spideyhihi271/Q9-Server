const mongoose = require('mongoose');
const Joi = require('joi');

const playlistSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        owner: { type: String, require: true },
        thumb: { type: String },
        songs: { type: [String], require: true, default: [] },
        artists: { type: [String], require: true, default: [] },
        genres: { type: [String], require: true, default: [] },
        description: { type: String, require: true },
        private: { type: Boolean, require: true, default: false },
        duration: { type: Number, require: true, default: 0 },
        views: { type: Number, require: true, default: 0 },
        type: { type: Number, require: true, default: 0 },
        createdByAdmin: { type: Boolean, require: true, default: false },
        deleted: { type: Boolean, require: true, default: false },
    },
    { timestamps: true },
);

// Validator
const validate = (playlist) => {
    const Schema = Joi.object({
        name: Joi.string().min(1).required(),
        owner: Joi.string().required(),
        songs: Joi.array(),
        description: Joi.string(),
        duration: Joi.number(),
        type: Joi.number().min(0).max(4),
        thumb: Joi.string(),
        createdByAdmin: Joi.boolean(),
        private: Joi.boolean(),
    });
    return Schema.validate(playlist);
};

// Create Model
const Playlist = mongoose.model('Playlist', playlistSchema);

// Export
module.exports = { Playlist, validate };
