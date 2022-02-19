const express = require('express');
const router = express.Router();
const path = require("path");
const controller = require('../controllers/events');

router.get('/all', controller.all);
router.get('/create', controller.create);
router.get('/:id', controller.byId);

module.exports = router;