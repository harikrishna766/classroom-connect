const express = require('express');
const cors = require('cors');   // ✅ import cors
const app = express();
// const pool = require('./config/db')
const schoolRoutes = require('./routers/school.route');
const studentRoutes = require('./routers/student.route');
const staffRoutes = require('./routers/staff.route');
const createSchemaRoute = require('./routers/createSchema.route');
require('dotenv').config();
const PORT = process.env.PORT;
const sequelize = require('./config/connectDb');

// app.use(cors({
//   origin: "http://localhost:5173",  // frontend URL (change if needed)
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));
app.use(cors());
app.use(express.json()); // for JSON body parsing

// Base route
app.use('/api/school', schoolRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/createSchema', createSchemaRoute);
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
