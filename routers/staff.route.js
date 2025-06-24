const express = require('express');
const router = express.Router();
const registerStaff  = require('../components/staffRegister');
const authorization = require('../middleware/authorization');

// POST /api/staff/register
router.post('/register', authorization, registerStaff);

module.exports = router;    