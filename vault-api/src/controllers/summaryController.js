const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
  getSummary
} = require('../controllers/summaryController');

router.use(authMiddleware);

router.get('/', getSummary);

module.exports = router;