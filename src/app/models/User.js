const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        email: { type: String, unique: true, require: true },
        password: { type: String, require: true },
        avatar: { type: String, default: '' },
        isAdmin: { type: Boolean, default: false },
        follows: { type: [String], require: true, default: [] },
        likeSongs: { type: [String], require: true, default: [] },
        dislikeSongs: { type: [String], require: true, default: [] },
        historySongs: { type: [String], require: true, default: [] },
        historyPlaylist: { type: [String], require: true, default: [] },
        favoriteSongs: { type: [String], require: true, default: [] },
        favoritePlaylists: { type: [String], require: true, default: [] },
        deleted: { type: Boolean, require: true, default: false },
    },
    { timestamps: true },
);

// Generator JWT
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, name: this.name, isAdmin: this.isAdmin },
        process.env.JWTPRIVATEKEY,
        { expiresIn: '7d' },
    );
    return token;
};

// Validator
const validate = (user) => {
    const Schema = Joi.object({
        name: Joi.string().min(1).required(),
        email: Joi.string().email().required(),
        password: passwordComplexity().required(),
        isAdmin: Joi.boolean(),
    });
    return Schema.validate(user);
};

// Create Model
const User = mongoose.model('User', userSchema);

// Export
module.exports = { User, validate };
