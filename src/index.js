// import your route 
const userRoutes = require('./src/routes/user-routes');
const thoughtRoutes = require('./src/routes/thought-routes');

// use the routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);


// add other routes here if needed ****



// for fun
console.log(
    (`
     ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ 
    ||S |||o |||c |||i |||a |||l |||- |||N |||e |||t |||w |||o |||r |||k |||- |||A |||P |||I ||
    ||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__||
    |/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|
  `)
  );