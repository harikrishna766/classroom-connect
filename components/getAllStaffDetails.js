const {getStaffModel} = require('../schema-setup/schemaLoader');

exports.getAllStaffDetails = async (req, res) => {
     try {
            const schema = req.user.schoolSchema;
            const limit = req.query.limit || 10;
            const offset = req.query.offset || 0;
            const count = await getStaffModel(schema).count();
            const staff = await getStaffModel(schema).findAll({ limit, offset});
            if (!staff) {
                return res.status(404).json({ success: false, message: 'Staff details not found' });
            }
            return res.status(200).json({ success: true, staff, count });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
}
