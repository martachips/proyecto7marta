const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('ta conectao');
  } catch (error) {
    console.log('la base de datos se fue');
  }
};

module.exports = { connectDB };
