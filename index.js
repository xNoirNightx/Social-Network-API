//  modules
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// Forgot to add express whooopppss
const app = express();
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Routes
const userRoutes = require('./src/routes/user-routes');
const thoughtRoutes = require('./src/routes/thought-routes');

// Parse to JSON
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Add other routes here if needed ****

// Mongo URI
const dburl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/SocialNetwork';

// Connect to Mongo
mongoose
  .connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Mongo connection here
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Close app
process.on('SIGINT', () => {
  mongoose.connection.close().then(() => {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

// For fun
console.log(`
     ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ 
    ||S |||o |||c |||i |||a |||l |||- |||N |||e |||t |||w |||o |||r |||k |||- |||A |||P |||I ||
    ||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__||
    |/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|
`);
