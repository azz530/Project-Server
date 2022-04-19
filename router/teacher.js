const express = require('express');
const router = express.Router();
const teacher = require('../router_handler/teacher.js')

router.get('/getClassStudentList',teacher.getStudentListByClass);
router.get('/getStudentList',teacher.getStudentList);
router.get('/searchStd',teacher.searchStd);
router.put('/changeStdInfo',teacher.changeStdInfo);

router.post('/addHomeWork',teacher.addHomeWork);
router.get('/getHomeWork',teacher.getHomeWork);
router.get('/getFinishStd',teacher.getFinishStd);
router.put('/changeHomeWork',teacher.changeHomeWork);
router.put('/commitHomeWork',teacher.commitHomeWork);
router.delete('/delHomeWork',teacher.delHomeWork);
router.get('/getStdHWorkInfo',teacher.getStdHWorkInfo);
router.post('/evaStdHWork',teacher.evaStdHWork);


router.get('/getStdScore',teacher.getStdScore);
router.get('/getClass',teacher.getClass);
router.get('/getClassStdScore',teacher.getClassStdScore);
router.put('/changeStdScore',teacher.changeStdScore);


router.get('/getNotice',teacher.getNotice);
router.post('/addNotice',teacher.addNotice);
router.put('/commitNotice',teacher.commitNotice);
router.delete('/delNotice',teacher.delNotice);
router.put('/changeNotice',teacher.changeNotice);

router.get('/getAllScore',teacher.getAllScore);

router.get('/getStudentEva',teacher.getStudentEva);
router.get('/getClassStudentEva',teacher.getClassStudentEva);
router.get('/getStudentEvaById',teacher.getStudentEvaById);
router.post('/editEvaluate',teacher.editEvaluate);
router.post('/addEvaluate',teacher.addEvaluate);
router.delete('/delEvaluate',teacher.delEvaluate);


module.exports = router;