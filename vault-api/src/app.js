const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes =
  require('./routes/authRoutes');

const categoryRoutes =
  require('./routes/categoryRoutes');

const transactionRoutes =
  require('./routes/transactionRoutes');

const summaryRoutes =
  require('./routes/summaryRoutes');

const errorMiddleware =
  require('./middleware/errorMiddleware');

const rateLimiter =
  require('./middleware/rateLimiter');

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(rateLimiter);

app.get('/', (req, res) => {

  res.json({
    message: 'Vault API Running'
  });

});

app.use(
  '/api/auth',
  authRoutes
);

app.use(
  '/api/categories',
  categoryRoutes
);

app.use(
  '/api/transactions',
  transactionRoutes
);

app.use(
  '/api/summary',
  summaryRoutes
);

app.use(errorMiddleware);

module.exports = app;