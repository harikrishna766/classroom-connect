module.exports = (sequelize, schema) => {
    const { DataTypes } = require('sequelize');
    return sequelize.define('StaffDetails', {
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        mobile_no: {
            type: DataTypes.STRING,
            unique: true
        },
        register_no: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
          },
          gender : {
            type: DataTypes.STRING,
            allowNull: false
          },
          join_date: {
            type: DataTypes.DATE,
            allowNull: false
          },
          qualification: {
            type: DataTypes.STRING,
            allowNull: false
          },
          designation: {
            type: DataTypes.STRING,
            allowNull: false
          },

        aadhar_no: {
            type: DataTypes.STRING,
        },
        pan_no: {
            type: DataTypes.STRING,
        },
        address: {
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
       
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        schema,
        tableName: 'staff_details',
        timestamps: false
    });
}