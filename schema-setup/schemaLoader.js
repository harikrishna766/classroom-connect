const {sequelize} = require('../config/connectDb');
const defineUserModel = require('../models/userModel');
const defineStudentModel = require('../models/studentModel');

exports.getUserModel = (schema_name) => {
    return defineUserModel(sequelize, schema_name);
}

exports.getStudentModel = (schema_name) => {
    return defineStudentModel(sequelize, schema_name);
}