const express = require('express');
const app = express();
// const pool = require('./config/db')
const schoolRoutes = require('./routers/school.route');
require('dotenv').config();
const PORT = process.env.PORT;
const sequelize = require('./config/connectDb');
app.use(express.json()); // for JSON body parsing

// Base route
app.use('/api/school', schoolRoutes);
app.get('/', (req, res) => {
  res.send('Hello School Project!');
});

//db connection check
// pool.connect()
//   .then(() => {
//     console.log('PostgreSQL DB connected successfully');
//   })
//   .catch((err) => {
//     console.error('Failed to connect to PostgreSQL DB:', err.message);
//     process.exit(1); // Exit if DB connection fails
//   });


  app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
