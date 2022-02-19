const express = require('express');
const router = express.Router();
const path = require("path");
const controller = require('../controllers/events');

router.get('/all', controller.all);
router.get('/:id', controller.byId);
router.get('/create', controller.create);
//router.get('/join/:id', controller.join);
//router.get('/delete/:id', controller.delete);

module.exports = router;