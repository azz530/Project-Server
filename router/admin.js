const express = require('express');
const router = express.Router();
const multer = require('multer');
const admin = require('../router_handler/admin.js');

router.post('/addStudent', admin.addStudent);
router.get('/getStudentList', admin.getStudentList);
router.get('/getClass', admin.getClass);
router.put('/changeStudent', admin.changeStudent);
router.delete('/delStudent', admin.delStudent);


router.get('/getGradeInfo', admin.getGradeInfo);
router.get('/getClassInfo', admin.getClassInfo);
router.get('/getClassStd', admin.getClassStd);


router.get('/getTeacherInfo', admin.getTeacherInfo);
router.post('/addTeacher', admin.addTeacher);
router.put('/changeTeacherInfo', admin.changeTeacherInfo);
router.delete('/delTeacher', admin.delTeacher);
router.get('/getCourse', admin.getCourse);


router.get('/getCourseInfo', admin.getCourseInfo);
router.post('/addCourse', admin.addCourse);
router.put('/changeCourseInfo', admin.changeCourseInfo);
router.delete('/delCourse', admin.delCourse);

router.get('/getUserList', admin.getUserList);
router.get('/getUserById', admin.getUserById);
router.put('/changeUserInfo', admin.changeUserInfo);
router.delete('/delUser', admin.delUser);

let banner = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'banner');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+Math.round(Math.random()*100)+file.originalname);
    }
})
let uploadBanner = multer({storage:banner});
router.post('/addBanner',uploadBanner.any(),admin.addBanner);
router.get('/getBanner',admin.getBanner);

let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'noticePic');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+Math.round(Math.random()*100)+file.originalname);
    }
})
let upload = multer({storage:storage});
router.get('/getNotice', admin.getNotice);
router.post('/addNotice',upload.any(),admin.addNotice);
router.put('/changeNotice', admin.changeNotice);
router.delete('/delNotice', admin.delNotice);

module.exports = router;