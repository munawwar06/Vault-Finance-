const prisma = require('../config/db');

const getUserByEmail =
  async (email) => {

    return await prisma.user.findUnique({
      where: {
        email
      }
    });

};

const createUser =
  async (
    username,
    email,
    password
  ) => {

    return await prisma.user.create({
      data: {
        username,
        email,
        password
      }
    });

};

module.exports = {
  getUserByEmail,
  createUser
};