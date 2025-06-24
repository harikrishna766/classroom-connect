const express = require('express');
const router = express.Router();
const { registerStudent } = require('../components/studentRegister');
const authorization = require('../middleware/authorization');
const getAllStudentDetails = require('../components/getAllStudentDetails');

// POST /api/student/register
router.post('/register', authorization, registerStudent);

// GET /api/student/getAllStudentDetails
router.get('/getAllStudentDetails', authorization, getAllStudentDetails);


module.exports = router;
