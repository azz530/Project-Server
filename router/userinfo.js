const express = require('express');
const router = express.Router();
const multer = require('multer');
const userinfo = require('../router_handler/userinfo.js');

router.get('/getUserInfo',userinfo.getUserInfo);

router.get('/getUserID',userinfo.getUserID);
let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+Math.round(Math.random()*100)+file.originalname);
    }
})
let upload = multer({storage:storage});
router.post('/uploadAvatar',upload.single('avatar'),userinfo.uploadAvatar);

router.put('/addTags',userinfo.addTags);
router.put('/delTags',userinfo.delTags);
router.put('/changeUserInfo',userinfo.changeUserInfo);

router.get('/getNotice',userinfo.getNotice);
router.get('/getHomeWork',userinfo.getHomeWork);
router.get('/getDetailsHW',userinfo.getDetailsHW);
let homework = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'homeworks');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+Math.round(Math.random()*100)+file.originalname);
    }
})
let uploadWorks = multer({storage:homework});
router.post('/commitHomeWork',uploadWorks.any(),userinfo.commitHomeWork);
router.get('/getScoreData',userinfo.getScoreData);


router.post('/addActivity',userinfo.addActivity);
router.get('/getActivity',userinfo.getActivity);


router.get('/getExamInfo',userinfo.getExamInfo);
router.get('/getStdEva',userinfo.getStdEva);
router.get('/getMyCourse',userinfo.getMyCourse);

router.get('/getChildrenInfo',userinfo.getChildrenInfo);
router.get('/getAllDiscuss',userinfo.getAllDiscuss);
router.post('/addDiscuss',userinfo.addDiscuss);
router.get('/getDiscussDetails',userinfo.getDiscussDetails);
router.get('/getDiscussComments',userinfo.getDiscussComments);
router.post('/addDiscussComments',userinfo.addDiscussComments);
router.post('/addReplay',userinfo.addReplay);



module.exports = router;