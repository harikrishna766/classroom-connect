const {sequelize} = require('../config/connectDb');
const defineUserModel = require('../models/userModel');

exports.getUserModel = (schema_name) => {
    return defineUserModel(sequelize, schema_name);
}