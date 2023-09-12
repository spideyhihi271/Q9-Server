const { Category, validate } = require('../models/Category');

class CategoryController {
    
    // Create new Category
    async createCategory(req, res) {
        const { error } = validate(req.body);
        // Validator
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        // Saving
        const newCategory = await new Category(req.body).save();

        return res
            .status(200)
            .send({ data: newCategory, message: 'Category was created!' });
    }

    // Get all category
    async getAllCategory(req, res) {
        const data = await Category.find({ deleted: false });
        return res.status(200).send({ data });
    }

    // Update Category
    async editCategory(req, res) {
        const editTarget = await Category.findById(req.params.id);
        const editData = Object.assign(editTarget, req.body);

        // Saving
        const updateData = await Category.findByIdAndUpdate(
            req.params.id,
            editData,
        );

        return res
            .status(200)
            .send({ data: updateData, message: 'Update successfully' });
    }

    // Deleted Category
    async deletedCategory(req, res) {
        let deleteTarget = await Category.findById(req.params.id);
        deleteTarget.deleted = true;

        // Saving
        const deletedData = await Category.findByIdAndUpdate(
            req.params.id,
            deleteTarget,
        );

        return res
            .status(200)
            .send({ data: deleteTarget, message: 'Deleted successfully' });
    }
}

module.exports = new CategoryController();
