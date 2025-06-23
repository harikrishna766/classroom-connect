const { Sequelize } = require("sequelize");
require('dotenv').config();

const opts = {
    dialect: 'postgres',
    logging: false,
    define: {
        timestamps: false
    },
    timezone: "+05:30",
    connectionLimit: 100
}

const sequelize = new Sequelize(process.env.DATABASE_URL, opts);

sequelize.authenticate()
    .then(() => {
        console.log('PostgreSQL DB connected successfully');
    })
    .catch((err) => {
        console.error('Failed to connect to PostgreSQL DB:', err.message);
        process.exit(1); // Exit if DB connection fails
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Public/Static models (central login schema)
db.schoolTenantModel = require('../models/publicModel')(sequelize, Sequelize);

module.exports = db;


