const express = require('express');
const router = express.Router();
const userinfo = require('../router_handler/userinfo.js');

router.get('/getUserInfo',userinfo.getUserInfo);
router.put('/addTags',userinfo.addTags);
router.put('/delTags',userinfo.delTags);

module.exports = router;