const Joi = require('joi');
const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        avatar: { type: String, require: true },
        cover: { type: String, require: true },
        third: { type: String, require: true },
        description: { type: String, require: true, default: '' },
        mainGenre: { type: String, required: true },
        follows: { type: Number, require: true, default: 0 },
        deleted: { type: Boolean, require: true, default: false },
    },
    { timestamps: true },
);

// Validator
const validate = (artist) => {
    const Schema = Joi.object({
        name: Joi.string().min(1).required(),
        avatar: Joi.string().required(),
        cover: Joi.string().required(),
        third: Joi.string(),
        description: Joi.string().required(),
        mainGenre: Joi.string().required(),
    });
    return Schema.validate(artist);
};

// Create Model
const Artist = mongoose.model('Artist', artistSchema);

// Export
module.exports = { Artist, validate };
