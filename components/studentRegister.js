const pool = require('../config/db');
exports.registerStudent = async (req, res) => {
  try {
    const { name, email, gender, date_of_birth, address, mother_name, father_name, mother_phone_no, father_phone_no, aadhar_no } = req.body;
    const school_code = req.headers['school-code'];
    if (!name || !email || !gender || !date_of_birth || !address || !school_code || !mother_name || !father_name || !mother_phone_no || !father_phone_no || !aadhar_no) {
      return res.status(400).json({
        success: false, 
        message: 'All fields are required',
      });
    }
    const schoolSchema = await pool.query(
      'SELECT schema_name FROM public.schools WHERE school_code = $1',
      [school_code]
    );
    if (schoolSchema.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'School not found. Please enter correct school code',
      });
    }
    const schema = schoolSchema.rows[0].schema_name;
    const register_no = `${school_code.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const admission_no = Math.floor(1000 + Math.random() * 9000);
    const user = await pool.query(
      `INSERT INTO ${schema}.student_details (name, email, gender, date_of_birth, address, mother_name, father_name, mother_phone_no, father_phone_no, aadhar_no, register_no, admission_no) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [name, email, gender, date_of_birth, address, mother_name, father_name, mother_phone_no, father_phone_no, aadhar_no, register_no, admission_no]
    );
    return res.status(200).json({
      success: true,
      message: 'Student registered successfully',
      user: user.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
