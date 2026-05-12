const express = require('express');

const router = express.Router();

const authMiddleware =
  require('../middleware/authMiddleware');

const {
  createCategory,
  getCategories
} = require(
  '../controllers/categoryController'
);

router.use(authMiddleware);

router.post(
  '/',
  createCategory
);

router.get(
  '/',
  getCategories
);

module.exports = router;