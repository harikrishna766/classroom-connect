module.exports = (sequelize, schema) => {
    const { DataTypes } = require('sequelize');
  
    return sequelize.define('User', {
      name: DataTypes.STRING,
      register_no: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
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
      schema,
      tableName: 'users',
      timestamps: false
    });
  };
  