const express = require('express');
const router = express.Router();
const schoolController = require('../components/schoolRegister');
const loginController = require('../components/login');

// POST /api/school/schoolRegister
router.post('/schoolRegister', schoolController.registerSchool);

// POST /api/school/login
router.post('/login', loginController.login);

module.exports = router;
