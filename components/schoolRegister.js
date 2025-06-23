const db = require('../config/connectDb');
const bcrypt = require('bcryptjs');
const { createSchoolSchema } = require('../schema-setup/createSchool');
const {getUserModel} = require('../schema-setup/schemaLoader');
exports.registerSchool = async (req, res) => {
    try {
        const { schoolCode, schoolName,schoolEmail,schoolPhoneNo,password } = req.body;
        if (!schoolName || !schoolCode || !schoolEmail || !schoolPhoneNo || !password) {
            return res.status(400).json({
                success: false,
                message: 'Name and code are required',
            });
        }

         // Password validation
    if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 8 characters long.',
        });
    }
  
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
        return res.status(400).json({
          success: false,
          message: 'Password must include at least one uppercase letter and one number.',
        });
      }
        const schema = schoolCode.toLowerCase().replace(/\s+/g, '_');
        // Check for duplicate code
        const exists = await db.schoolTenantModel.findOne({ where: { school_code: schoolCode } });
        if (exists) {
            return res.status(400).json({
                success: false,
                message: 'School code already exists',
            });
        }
        await db.schoolTenantModel.create({
            school_name: schoolName,
            school_code: schoolCode,
            schema_name: schema,
            school_email: schoolEmail,
            school_phone_no: schoolPhoneNo
        });

        await createSchoolSchema(schema);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await getUserModel(schema).create({
            name: schoolName,
            register_no: schoolCode,
            password:hashedPassword,
            role_id: 1,
            role_name: 'SuperAdmin'
        });

        return res.status(200).json({
            success: true,
            message: `School '${schoolName}' registered successfully`,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
