require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const APP_PORT = Number(process.env.APP_PORT ?? 3000);

app.use('/api/health-check', (req, res) => {
  return res
    .status(200)
    .json({ message: 'Server is healthy' });
});

app.listen(APP_PORT, () => {
  console.log(`Server running on port ${APP_PORT}`);
})

module.exports = app;
