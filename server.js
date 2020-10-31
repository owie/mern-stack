const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const items = require('./routes/api/Items');
const users = require('./routes/api/Users');
const auth = require('./routes/api/Auth');

const app = express();

// BodyParser Middleware
app.use(express.json());

// Database config
const { MONGO_URI } = config;

// Connect to Mongo
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('database connected'))
  .catch(err => console.log(err))


// Routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
