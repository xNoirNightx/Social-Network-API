//  modules
const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();

// fforgot to add express whooopppss
const app = express();
const PORT = process.env.PORT || 3000;

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// routes
const userRoutes = require('./src/routes/user-routes');
const thoughtRoutes = require('./src/routes/thought-routes');

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Add other routes here if needed ****

// mongo  URI
const dbURI = 'mongodb://localhost:27017/SocialNetwork';

// connect to the Mongo
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

//  mongo connection here
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// close app
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

// for fun 
console.log(`
     ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ 
    ||S |||o |||c |||i |||a |||l |||- |||N |||e |||t |||w |||o |||r |||k |||- |||A |||P |||I ||
    ||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__||
    |/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|
`);
