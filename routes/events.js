const express = require('express');
const router = express.Router();
const path = require("path");
const controller = require('../controllers/events');

router.get('/all', controller.all);
router.post('/create', controller.create);
router.post('/join/:id', controller.join);
router.post('/delete/:id', controller.delete);

module.exports = router;