const mongoose = require('mongoose');
const Joi = require('joi');

const songSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        category: { type: String, require: true },
        artist: { type: [String], require: true },
        song: { type: String, require: true },
        thumb: { type: String, require: true },
        duration: { type: Number, require: true },
        lyrics: { type: String, require: true, default: '' },
        views: { type: Number, require: true, default: 0 },
        lastedRank: { type: Number, require: true, default: 0 },
        private: { type: Boolean, require: true, default: false },
    },
    { timestamps: true },
);

// Validator
const validate = (song) => {
    const Schema = Joi.object({
        name: Joi.string().min(1).required(),
        artist: Joi.array().required(),
        category: Joi.string.required(),
        song: Joi.string().required(),
        thumb: Joi.string().required(),
        duration: Joi.number().required(),
        lyrics: Joi.string().required(),
        private: Joi.boolean().required(),
    });
    return Schema.validate(song);
};

// Create Model
const Song = mongoose.model('Song', songSchema);

// Export
module.exports = { Song, validate };
