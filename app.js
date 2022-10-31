const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const routers = require('./routes');
const { handleErrors } = require('./errors');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(routers);

app.use(errors());

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
