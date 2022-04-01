const express = require('express');
const router = express.Router();
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

 
 
module.exports = router;