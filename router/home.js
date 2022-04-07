const express = require('express');
const router = express.Router();
const home = require('../router_handler/home.js');
router.get('/getNotice',home.getNotice);
router.get('/getNoticeById',home.getNoticeById);
router.get('/getOtherNotice',home.getOtherNotice);

module.exports = router;