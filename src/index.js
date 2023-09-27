// import your route 
const userRoutes = require('./src/routes/user-routes');
const thoughtRoutes = require('./src/routes/thought-routes');

// use the routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);


// add other routes here if needed ****