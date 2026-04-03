require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


// Connect to mongodb atlas using URI
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const { logger } = require('./middleware/logger.middleware.js');
app.use('/', logger);

const { router } = require('./routes/studentRoutes.js');
app.use('/students', router);

app.get('/', (req, res) => {
  res.send('API running');
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
