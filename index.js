require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');
const videogamesRouter = require('./src/api/routes/videogame');
const consolesRouter = require('./src/api/routes/console');
const usersRoutes = require('./src/api/routes/user');

const app = express();

app.use(express.json());

connectDB();

app.use('/api/v1/videogames', videogamesRouter);
app.use('/api/v1/consoles', consolesRouter);
app.use('/api/v1/users', usersRoutes);

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found');
});

app.listen(3000, () => {
  console.log('Server running in http://localhost:3000');
});
