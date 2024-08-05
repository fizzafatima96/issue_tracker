const express = require('express');
const app = express();
const connectDB = require('./config/dbconnect');
const tracker_router = require('./routes/issueTracker.routes');
app.use(express.json());


app.use('/api', tracker_router);

require('dotenv').config();
connectDB()
const port =  process.env.PORT
  app.listen(port, () => {
    console.log(` app listening at http://localhost:${port}`);
  });