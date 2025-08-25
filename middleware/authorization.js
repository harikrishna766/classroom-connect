const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET ;
const db = require('../config/connectDb');
module.exports = async (req, res, next) => {
const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const schoolSchema = await db.schoolTenantModel.findOne({ where: { schema_name: decoded.schoolSchema } });
    if (!schoolSchema) {
      return res.status(401).json({
        success: false, 
        message: 'Unauthorized',
      });
    }
    const schema = schoolSchema.schema_name;
    const getUserModel = require('../schema-setup/schemaLoader').getUserModel;
    const user = await getUserModel(schema).findOne({ where: { token  } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }
    req.user = decoded; // attach user info (school_code, schoolSchema, etc.)
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
};
