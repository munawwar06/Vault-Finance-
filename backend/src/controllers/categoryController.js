const prisma = require('../config/db')

exports.getCategories = async (req, res) => {

  const categories = await prisma.category.findMany()

  res.json(categories)
}

exports.createCategory = async (req, res) => {

  const { name, type } = req.body

  const category = await prisma.category.create({
    data: {
      name,
      type
    }
  })

  res.status(201).json(category)
}