const express = require('express');
const router = express.Router();
const registerStaff  = require('../components/staffRegister');
const authorization = require('../middleware/authorization');
const {getAllStaffDetails} = require('../components/getAllStaffDetails');
// POST /api/staff/register
router.post('/register', authorization, registerStaff);

// GET /api/staff/getAllStaffDetails
router.get('/getAllStaffDetails', authorization, getAllStaffDetails);

module.exports = router;    