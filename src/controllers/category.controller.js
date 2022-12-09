const Category = require('../models/category.model');
const { INTERNAL_SERVER_ERROR, OK, CREATED } = require('http-status');

class categories {
  static async createCategory(req, res) {
    try {
      const { name, description } = req.body;
      const category = await Category.create({
        name,
        description,
      });
      return res.status(CREATED).json({
        message: 'Category created',
        data: category,
      });
    } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }

  static async getCategories(req, res) {
    try {
      const { categoryId } = req.query;
      if (categoryId) {
        const category = await Category.findOne({
          _id: categoryId,
        });
        return res.status(OK).json({
          message: 'Category found',
          data: category,
        });
      }
      const categories = await Category.find();
      return res.status(OK).json({
        message: 'Categories found',
        data: categories,
      });
    } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }

  static async updateCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const { name, description } = req.body;
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({
          message: 'Category not found',
        });
      }
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: categoryId },
        { name, description },
        { new: true },
      );
      return res.status(OK).json({
        message: 'Category updated',
        data: updatedCategory,
      });
    } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({
          message: 'Category not found',
        });
      }
      await Category.findOneAndDelete({ _id: categoryId });
      return res.status(OK).json({
        message: 'Category deleted',
      });
    } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }
}

module.exports = categories;
