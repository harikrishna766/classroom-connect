const {sequelize} = require('../config/connectDb');
const defineUserModel = require('../models/tenantModel/userModel');
const defineStudentModel = require('../models/tenantModel/studentModel');
const defineStaffModel = require('../models/tenantModel/staffModel');

exports.getUserModel = (schema_name) => {
    return defineUserModel(sequelize, schema_name);
}

exports.getStudentModel = (schema_name) => {
    return defineStudentModel(sequelize, schema_name);
}

exports.getStaffModel = (schema_name) => {
    return defineStaffModel(sequelize, schema_name);
}