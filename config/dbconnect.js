const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
const uri = process.env.CONNECTDB
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
 
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
