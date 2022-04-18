const express = require('express');
const router = express.Router();
const user = require('../router_handler/user.js')
//登录
router.post('/login',user.login);
router.post('/reguser',user.reguser);
router.get('/getUserID',user.getUserID);
router.get('/checkPsw',user.checkPsw);
router.get('/checkUser',user.checkUser);
router.put('/changePsw',user.changePsw);
router.post('/forgetPsw',user.forgetPsw);

module.exports = router;