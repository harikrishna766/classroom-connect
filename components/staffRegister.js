const db = require('../config/connectDb');
const { getStaffModel, getUserModel } = require('../schema-setup/schemaLoader');
const moment = require('moment');
const bcrypt = require('bcryptjs');

const staffRegister = async (req, res) => {
    const { name, email, mobile_no, aadhar_no, pan_no, address, gender, join_date, qualification,designation } = req.body;
    const schema = req.user.schoolSchema;
    try {
        const staff = await getStaffModel(schema).findOne({ where: { email } });
        if (staff) {
            return res.status(400).json({ success: false, message: 'EmailId already exists' });
        }
        const totalStaff = await getStaffModel(schema).count();
        const newNumber = (totalStaff + 1).toString().padStart(4, '0'); // e.g., '0001'
        const currentYear = moment().format('YYYY');
        const register_no = `${currentYear}${newNumber}S`;
        const password = 'School@123';
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await getStaffModel(schema).create({
            name,
            email,
            mobile_no,
            aadhar_no,
            pan_no,
            address,
            gender,
            join_date,
            qualification,
            designation,
            register_no,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        });
        await getUserModel(schema).create({
            name,
            register_no,
            password: hashedPassword,
            role_id: 3,
            role_name: 'Teacher',
            status: 'Active',
            is_first_login: true,
        });
        return res.status(200).json({ success: true, message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
module.exports = staffRegister;
