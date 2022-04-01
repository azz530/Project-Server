const express = require('express');
const router = express.Router();
const teacher = require('../router_handler/teacher.js')

router.get('/getClassStudentList',teacher.getStudentListByClass);
router.get('/getStudentList',teacher.getStudentList);
router.put('/changeStdCheck',teacher.changStudentCheck);
router.put('/changeStdInfo',teacher.changStudentInfo);

router.post('/addHomeWork',teacher.addHomeWork);
router.get('/getHomeWork',teacher.getHomeWork);
router.put('/changeHomeWork',teacher.changeHomeWork);
router.put('/commitHomeWork',teacher.commitHomeWork);
router.delete('/delHomeWork',teacher.delHomeWork);


router.get('/getStdScore',teacher.getStdScore);
router.get('/getClass',teacher.getClass);
router.get('/getClassStdScore',teacher.getClassStdScore);
router.put('/changeStdScore',teacher.changeStdScore);


router.get('/getNotice',teacher.getNotice);
router.post('/addNotice',teacher.addNotice);
router.put('/commitNotice',teacher.commitNotice);
router.delete('/delNotice',teacher.delNotice);
router.put('/changeNotice',teacher.changeNotice);

router.get('/getClassScore',teacher.getClassScore);
module.exports = router;