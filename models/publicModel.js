// const pool = require('../config/db');

// // Get school schema by code
// exports.getSchoolSchemaByCode = async (schoolCode) => {
//   const res = await pool.query(
//     'SELECT schema_name FROM public.schools WHERE school_code = $1',
//     [schoolCode]
//   );
//   return res.rows[0];
// };  


const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
return SchoolTenant = sequelize.define('schools', {
  school_code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  school_name:{
    type:DataTypes.STRING
  }, 
  schema_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'schools',
  schema: 'public',
  timestamps: false
});
}

