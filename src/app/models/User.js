const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        email: { type: String, unique: true, require: true },
        password: { type: String, require: true },
        avatar: { type: String, required: true, default: '' },
        role: { type: Number, require: true, default: 0 },
        likeSongs: { type: [String], require: true, default: [] },
        historySongs: { type: [String], require: true, default: [] },
        favoriteSongs: { type: [String], require: true, default: [] },
        favoritePlaylists: { type: [String], require: true, default: [] },
        favoriteSingers: { type: [String], require: true, default: [] },
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
        password: passwordComplexity().require(),
        role: Joi.number(),
    });
    return Schema.validate(user);
};

// Create Model
const User = mongoose.model('User', userSchema);

// Export
module.exports = { User, validate };
