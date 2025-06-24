// const pool = require('../config/db');

const {sequelize} = require('../config/connectDb');
const { DataTypes } = require('sequelize');

exports.createSchoolSchema = async (schemaName) => {
  // Create schema if not exists
  await sequelize.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);

  // Define user model
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    register_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(10),
      defaultValue: 'Active',
      validate: {
        isIn: [['Active', 'Block']]
      }
    },
    role_id: DataTypes.INTEGER,
    role_name: DataTypes.STRING,
    token: DataTypes.STRING,
    is_first_login: DataTypes.BOOLEAN,
    otp: DataTypes.STRING,
    otp_expiry: DataTypes.DATE,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    schema: schemaName,
    tableName: 'users',
    timestamps: false
  });

  // Define student_details model
  const StudentDetails = sequelize.define('StudentDetails', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    register_no: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    mother_name: DataTypes.STRING,
    father_name: DataTypes.STRING,
    mother_phone_no: DataTypes.STRING,
    father_phone_no: DataTypes.STRING,
    aadhar_no: DataTypes.STRING,
    admission_no: {
      type: DataTypes.INTEGER,
      unique: true
    },
    gender: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    nationality: DataTypes.STRING,
    state: DataTypes.STRING,
    district: DataTypes.STRING,
    pincode: DataTypes.STRING,
    address: DataTypes.TEXT,
    join_date: DataTypes.DATE,
    join_class: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Active',
      validate: {
        isIn: [['Active', 'Block']]
      }
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    schema: schemaName,
    tableName: 'student_details',
    timestamps: false
  });

  // Define staff model
  const Staff = sequelize.define('Staff', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.TEXT
  }, {
    schema: schemaName,
    tableName: 'staff',
    timestamps: false
  });

  // Sync all models
  await User.sync();
  await StudentDetails.sync();
  await Staff.sync();
};


// exports.createSchoolSchema = async (schemaName) => {
//   await pool.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);


//   // Create user table inside schema
//   await pool.query(`
//     CREATE TABLE IF NOT EXISTS ${schemaName}.users (
//       id SERIAL PRIMARY KEY,
//       name VARCHAR(100),
//       register_no VARCHAR(50) UNIQUE NOT NULL,
//       password TEXT NOT NULL,
//       status VARCHAR(10) DEFAULT 'Active' CHECK (status IN ('Active', 'Block')),
//       role_id INTEGER,
//       role_name VARCHAR(50),
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//   `);

//  // Create Student Details table inside schema
//  await pool.query(`
//   CREATE TABLE IF NOT EXISTS ${schemaName}.student_details (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     register_no VARCHAR(50) UNIQUE NOT NULL,
//     email VARCHAR(100) UNIQUE,
//     mother_name VARCHAR(100),
//     father_name VARCHAR(100),
//     mother_phone_no VARCHAR(15),
//     father_phone_no VARCHAR(15),
//     aadhar_no VARCHAR(15),
//     admission_no INTEGER UNIQUE,
//     gender VARCHAR(10),
//     date_of_birth DATE,
//     address TEXT,
//     status VARCHAR(10) DEFAULT 'Active' CHECK (status IN ('Active', 'Block')),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );
// `);


//   // Create staff table inside schema
//   await pool.query(`
//     CREATE TABLE IF NOT EXISTS ${schemaName}.staff (
//       id SERIAL PRIMARY KEY,
//       name VARCHAR(100),
//       email VARCHAR(100) UNIQUE,
//       password TEXT
//     );
//   `);
// };
