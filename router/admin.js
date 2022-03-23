const express = require('express');
const router = express.Router();
const admin = require('../router_handler/admin.js');
const multer = require('multer')

router.post('/addStudent', admin.addStudent);
router.put('/changeStudent', admin.changeStudent);
router.delete('/delStudent', admin.delStudent);


router.get('/getGradeInfo', admin.getGradeInfo);
router.get('/getClassInfo', admin.getClassInfo);
router.get('/getTeacherInfo', admin.getTeacherInfo);
router.post('/addTeacher', admin.addTeacher);
router.put('/changeTeacherInfo', admin.changeTeacherInfo);
router.delete('/delTeacher', admin.delTeacher);
router.get('/getCourse', admin.getCourse);
router.get('/getCourseInfo', admin.getCourseInfo);
router.post('/addCourse', admin.addCourse);
router.put('/changeCourseInfo', admin.changeCourseInfo);
router.delete('/delCourse', admin.delCourse);

let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname);
    }
})
let upload = multer({storage:storage});
router.post('/uploadAvatar',upload.single('avatar'),admin.uploadAvatar);  

router.get('/getUserLog',admin.getUserLog);  



module.exports = router;