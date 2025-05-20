require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { sequelize } = require('./models');
const scheduleRouters = require('./modules/schedules/schedule.router');
const errorHandler = require('./middlewares/error-handler');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const APP_PORT = Number(process.env.APP_PORT ?? 3000);

app.use('/api/health-check', (_req, res) => {
  return res
    .status(200)
    .json({ message: 'Server is healthy' });
});

app.use('/api/schedules/', scheduleRouters);

app.use(errorHandler);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    app.listen(APP_PORT, () => {
      console.log(`Server is running on port ${APP_PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
})();

module.exports = app;
