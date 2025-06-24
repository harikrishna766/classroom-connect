const express = require('express');
const router = express.Router();
const { registerStudent } = require('../components/studentRegister');
const authorization = require('../middleware/authorization');
// POST /api/student/register
router.post('/register', authorization, registerStudent);

module.exports = router;
