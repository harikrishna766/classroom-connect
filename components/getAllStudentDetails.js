const db = require('../config/connectDb');
const { getStudentModel } = require('../schema-setup/schemaLoader');
const getAllStudentDetails = async (req, res) => {
    try {
        const schema = req.user.schoolSchema;
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;
        const count = await getStudentModel(schema).count();
        const student = await getStudentModel(schema).findAll({ limit, offset});
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student details not found' });
        }
        return res.status(200).json({ success: true, student, count });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = getAllStudentDetails;
