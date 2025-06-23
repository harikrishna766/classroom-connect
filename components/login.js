const db = require('../config/connectDb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {getUserModel} = require('../schema-setup/schemaLoader');
exports.login = async (req, res) => {
  try {
    const { register_no, school_code, password } = req.body;
    if (!register_no || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Register number and password are required. Please enter correct register number and password  ',
      });
    }
    const schoolSchema = await db.schoolTenantModel.findOne({ where: { school_code: school_code } });
    if (!schoolSchema) {
      return res.status(404).json({
        success: false,
        message: 'School not found. Please enter correct school code',
      });
    }
    const user = await getUserModel(schoolSchema.schema_name).findOne({ where: { register_no: register_no } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found. Please enter correct register number',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Password is incorrect. Please enter correct password',
      });
    }
    const token = jwt.sign({ school_code: school_code,schoolSchema:schoolSchema.schema_name }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      role_name: user.role_name,
      role_id: user.role_id,
      name: user.name,
      school_code,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
