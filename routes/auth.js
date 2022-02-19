const express = require('express');
const router = express.Router();
const path = require("path");
const controller = require('../controllers/auth.js');

router.get('/', controller.login);

module.exports = router;