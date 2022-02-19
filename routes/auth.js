const express = require('express');
const router = express.Router();
const path = require("path");
const controller = require('../controllers/auth.js');

router.get('/login', controller.login);
router.get('/registration', controller.registration);

module.exports = router;