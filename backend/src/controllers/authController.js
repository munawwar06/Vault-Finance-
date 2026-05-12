const bcrypt = require('bcryptjs')
const prisma = require('../config/db')
const generateToken = require('../utils/generateToken')

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    })

    res.status(201).json({
      message: 'User registered',
      user
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials'
      })
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid credentials'
      })
    }

    const token = generateToken(user.id)

    res.json({
      token
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}