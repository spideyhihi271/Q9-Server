const mongoose = require('mongoose');
const Joi = require('joi');

const playlistSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        owner: { type: String, require: true },
        songs: { type: [String], require: true, default: [] },
        description: { type: String, require: true },
        private: { type: Boolean, require: true, default: false },
        duration: { type: Number, require: true },
        views: { type: Number, require: true, default: 0 },
        isSingle: { type: Boolean, require: true, default: false },
    },
    { timestamps: true },
);

// Validator
const validate = (playlist) => {
    const Schema = Joi.object({
        name: Joi.string().min(1).required(),
        owner: Joi.string().required(),
        songs: Joi.array(),
        description: Joi.string().min(0).max(500),
        duration: Joi.number().required(),
        isSingle: Joi.boolean(),
    });
    return Schema.validate(playlist);
};

// Create Model
const Playlist = mongoose.model('Playlist', playlistSchema);

// Export
module.exports = { Playlist, validate };
