const express = require('express');
const router = express.Router();
const home = require('../router_handler/home.js');
router.get('/menu',home.menu);

module.exports = router;