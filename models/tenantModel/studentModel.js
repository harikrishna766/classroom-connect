module.exports = (sequelize, schema) => {
    const { DataTypes } = require('sequelize');
  
    return sequelize.define('StudentDetails', {
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
      schema,
      tableName: 'student_details',
      timestamps: false
    });
  };