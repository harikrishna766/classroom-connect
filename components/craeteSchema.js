const {createSchoolSchema} = require('../schema-setup/createSchool');

const createSchema = async (req, res) => {
    const { schemaName } = req.body;
    try {
        await createSchoolSchema(schemaName);
        res.status(201).json({ message: 'Schema created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = createSchema;
