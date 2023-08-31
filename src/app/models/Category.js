const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
    },
    { timestamps: true },
);

// Validator
const validate = (category) => {
    const Schema = Joi.object({
        name: Joi.string().min(1).required(),
    });
    return Schema.validate(category);
};

// Create Model
const Category = mongoose.model('Category', categorySchema);

// Export
module.exports = { Category, validate };
