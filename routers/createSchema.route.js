const express = require('express');
const router = express.Router();
const createSchema = require('../components/craeteSchema');

router.post('/', createSchema);

module.exports = router;

