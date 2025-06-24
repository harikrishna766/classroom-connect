const db = require('../config/connectDb');
const {getUserModel,getStudentModel} = require('../schema-setup/schemaLoader');
const moment = require('moment');
const bcrypt = require('bcryptjs');

exports.registerStudent = async (req, res) => {
  try {
    const { name, email, gender, date_of_birth, address, mother_name, father_name, mother_phone_no, father_phone_no, aadhar_no, nationality, state, district, pincode,join_class,join_date } = req.body;
    // const school_code = req.headers['school-code'];
    if (!name || !email || !gender || !date_of_birth || !address || !mother_name || !father_name || !mother_phone_no || !father_phone_no || !aadhar_no || !nationality || !state || !district || !pincode || !join_class || !join_date) {
      return res.status(400).json({
        success: false, 
        message: 'All fields are required',
      });
    }
    // const schoolSchema = await db.schoolTenantModel.findOne({ where: { school_code: school_code } });
    // if (!schoolSchema) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'School not found. Please enter correct school code',
    //   });
    // }
    // const schema = schoolSchema.schema_name;
    const schema = req.user.schoolSchema;

     // Count existing students for this year (you can make this stricter)
  const totalStudents = await getStudentModel(schema).count();
  const newNumber = (totalStudents + 1).toString().padStart(4, '0'); // e.g., '0001'
  const currentYear = moment().format('YYYY');
  const register_no= `${currentYear}${newNumber}`;
  const admission_no = Math.floor(1000 + Math.random() * 9000);
  // defult password
  const password = 'School@123';
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = await getStudentModel(schema).create({
      name,
      email,
      gender,
      date_of_birth,
      address,
      mother_name,
      father_name,
      mother_phone_no,
      father_phone_no,
      aadhar_no,
      register_no,
      admission_no,
      status: 'Active',
      join_date: join_date,
      join_class,
      nationality,
      state,
      district,
      pincode,
    });
    const user = await getUserModel(schema).create({
      name,
      register_no,
      password: hashedPassword,
      role_id: 2,
      role_name: 'Student',
      status: 'Active',
      is_first_login: true,
    });
    return res.status(200).json({
      success: true,
      message: 'Student registered successfully',
      student: student,
      user: user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
