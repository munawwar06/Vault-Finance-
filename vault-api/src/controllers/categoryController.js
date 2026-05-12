const prisma = require('../config/db');

exports.createCategory = async (req, res) => {
  try {
    const { name, type } = req.body;

    const category = await prisma.category.create({
      data: {
        name,
        type
      }
    });

    res.status(201).json(category);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();

    res.json(categories);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};