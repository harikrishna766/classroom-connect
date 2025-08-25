const fs = require('fs');
const path = require('path');

module.exports = async (sequelize, schema) => {
  const models = {};
  const modelsPath = path.join(__dirname, '../models/tenantModel');    

  const files = fs.readdirSync(modelsPath).filter(file => file.endsWith('.js'));

  for (const file of files) {
    const defineModel = require(path.join(modelsPath, file));
    const model = defineModel(sequelize, schema);
    models[model.name] = model;
  }

  // Sync all loaded models
  for (const model of Object.values(models)) {
    await model.sync({ alter: true }); // Safe for schema evolution
  }

  return models;
};
