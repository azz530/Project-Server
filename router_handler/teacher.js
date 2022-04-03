const db = require('../db/index.js');
const tools = require('../utils/tools.js');

exports.getStudentListByClass = (req,res)=>{
    const class_id = req.query.class_id;
    const teacher_id = req.query.teacher_id;
    let pageNum = parseInt(req.query.pageNum)-1;
    let pageSize = parseInt(req.query.pageSize);
    const allSql = 'select count(*) as total,t1.student_id,t1.student_name,t1.sex,t4.class_name,t1.student_check,t1.birthday,t1.address from student t1 left join score t2 on t1.student_id = t2.student_id join teacher t3 on t2.course_id = t3.course_id join class t4 on t1.class_id = t4.class_id where t3.teacher_id = ? and t1.class_id=?';
    const slSql = 'select t1.student_id,t1.student_name,t1.sex,t4.class_name,t1.student_check,t1.birthday,t1.address from student t1 left join score t2 on t1.student_id = t2.student_id join teacher t3 on t2.course_id = t3.course_id join class t4 on t1.class_id = t4.class_id where t3.teacher_id = ? and t1.class_id=? limit ?,?';
    db.query(slSql,[teacher_id,class_id,pageNum*pageSize,pageSize],(err,results)=>{
        if(err) {
            return res.cc(err.message);
        } else if(results.length ==0 ){
            return res.cc('查询失败',400);
        } else {
            for(let i=0;i<results.length;i++) {
                if(results[i].student_check===0){
                    results[i].student_check = false;
                } else{
                    results[i].student_check = true;
                }
            }
            db.query(allSql,[teacher_id,class_id],(error,total) =>{
                if(error){
                    return res.cc(error.message);
                } else if(results == 0) {
                    return res.cc('查询失败',404);
                } else{
                    res.send({
                        status:200,
                        message:'查询成功',
                        data:results,
                        total:total[0]['total']
                    })
                }
            })
        }
    })
}
exports.getClass=(req,res)=>{
    const teacher_id = req.query.teacher_id;
    const sql = 'select distinct t4.class_id,t4.class_name from student t1 left join score t2 on t1.student_id = t2.student_id join teacher t3 on t2.course_id = t3.course_id join class t4 on t1.class_id = t4.class_id where t3.teacher_id = ?';
    db.query(sql,teacher_id,(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.length<0){
            return res.cc('查询失败',400);
        } else {
            return res.send({
                status:200,
                message:'查询成功',
                data: JSON.parse(JSON.stringify(results))
            })
        }
    })
}
exports.getStudentList = (req,res)=>{
    let pageNum = parseInt(req.query.pageNum)-1;
    let pageSize = parseInt(req.query.pageSize);
    const teacher_id = parseInt(req.query.teacher_id);
    const sql1 = 'select count(*) as total,t1.student_id,t1.student_name,t1.sex,t4.class_name,t1.student_check,t1.birthday,t1.address from student t1 left join score t2 on t1.student_id = t2.student_id join teacher t3 on t2.course_id = t3.course_id join class t4 on t1.class_id = t4.class_id where t3.teacher_id = ?';
    const slSql = 'select t1.student_id,t1.student_name,t1.sex,t4.class_name,t1.student_check,t1.birthday,t1.address from student t1 left join score t2 on t1.student_id = t2.student_id join teacher t3 on t2.course_id = t3.course_id join class t4 on t1.class_id = t4.class_id where t3.teacher_id = ? limit ?,?';
    db.query(slSql,[teacher_id,pageNum*pageSize,pageSize],(err,results) =>{
        if(err){
            return res.cc(err,400);
        } else if(results.length == 0) {
            return res.cc('查询失败',404);
        } else{
            for(let i=0;i<results.length;i++) {
                if(results[i].student_check===0){
                    results[i].student_check = false;
                } else{
                    results[i].student_check = true;
                }   
                results[i].birthday = tools.formatDate(results[i].birthday,'YYYY-MM-DD');
            }
            db.query(sql1,teacher_id,(error,total)=>{
                if(error){
                    return res.cc(error.message);
                } else {
                    res.send({
                        status:200,
                        message:'查询成功',
                        data:results,
                        total:total[0]['total']
                    })
                }
            })
        }
    })
}
exports.changStudentCheck = (req,res)=>{
    let student_check = req.body.student_check;
    const student_id = req.body.student_id;
    if(student_check===false){
        student_check = 0;
    } else {
        student_check = 1;
    }
    const sql = 'update student set student_check = ? where student_id =?'
    db.query(sql,[student_check,student_id],(err,results)=>{
        if(err) {
            return res.cc(err);
        } else if(results.affectedRows != 1){
            return res.cc('更改打卡状态失败',400);
        } else {
            res.send({
                status:200,
                message:'更改成功'
            });
        }
    })
}
exports.changStudentInfo = (req,res) =>{
    const sql = 'update student set ? where student_id=?';
    const changeList = {
        student_name:req.body.student_name,
        sex:req.body.sex,
        birthday:req.body.birthday,
        address:req.body.address,
    };
    let student_id = req.body.student_id
    db.query(sql,[changeList,student_id],(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.affectedRows != 1){
            return res.cc('修改失败',400);
        } else {
            return res.cc('修改成功',200);
        }
    });
}


exports.addHomeWork=(req,res)=>{
    const nowDate = new Date();
    const end_time = tools.addDate(nowDate,parseInt(req.body.hw_deadline),'days');
    const homeworkInfo = {
        work_id:parseInt(req.body.hw_id),
        work_name:req.body.hw_name,
        work_details:req.body.hw_details,
        work_deadline:req.body.hw_deadline,
        work_time:nowDate,
        end_time:end_time,
        teacher_id:req.query.teacher_id,
    };
    const sql = 'select*from homework where work_id = ?';
    const addSql = 'insert into homework set ?';
    db.query(sql,homeworkInfo.work_id,(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.length>0){
            return res.cc('该ID已被使用',402);
        } else {
            db.query(addSql,homeworkInfo,(error,result)=>{
                if(err){
                    return res.cc(error.message);
                } else if(result.affectedRows != 1) {
                    return res.cc('新增失败',400);
                } else {
                    return res.cc('新增成功',200);
                }
            })
        }
    })
}
exports.getHomeWork = (req,res) =>{
    let pageNum = parseInt(req.query.pageNum)-1;
    let pageSize = parseInt(req.query.pageSize);
    const teacher_id = parseInt(req.query.teacher_id);
    const slSql = 'select * from homework where teacher_id =? order by work_time desc limit ?,?';
    const sql = 'select count(*) as total from homework where teacher_id = ?';
    db.query(slSql,[teacher_id,pageNum*pageSize,pageSize],(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.length == 0){
            return res.cc('查询失败',400);
        } else {
            for(let i = 0;i<results.length;i++) {
                if( results[i].work_status == 0 || results[i].work_status == null ) {
                    results[i].work_status = "未发布";
                } else {
                    results[i].work_status = "已发布";
                }
            }
            db.query(sql,teacher_id,(error,total)=>{
                if(error){
                    return res.cc(error.message);
                } else {
                    return res.send({
                        status:200,
                        message:'查询成功',
                        data:results,
                        total:total[0]['total']
                    })
                }
            })
        }
    })
}
exports.changeHomeWork = (req,res) =>{
    let work_id = req.body.work_id;
    const changeInfo = {
        work_name:req.body.work_name,
        work_details:req.body.work_details,
        work_deadline:req.body.work_deadline,
    }
    const sql = 'update homework set ? where work_id=?';
    const sql2 = 'select work_time from homework where work_id = ?';
    db.query(sql2,work_id,(error,work_time)=>{
        if(error){
            return res.cc(error.message);
        } else if(work_time.length<0){
            return res.cc('修改失败',400);
        } else {
            const workDate = JSON.parse(JSON.stringify(work_time[0].work_time));
            changeInfo.end_time = tools.addDate(workDate,parseInt(changeInfo.work_deadline),'days');
            db.query(sql,[changeInfo,work_id],(err,results)=>{
                if(err){
                    return res.cc(err.message);
                } else if(results.affectedRows != 1){
                    return res.cc('修改失败',400);
                } else{
                    return res.cc('修改成功',200);
                }
            })
        }
    })
}
exports.commitHomeWork = (req,res) =>{
    let work_id = req.body.id;
    const sql = `update homework set work_status = 1 where work_id = ?`;
    const selectSql = 'select work_status from homework where work_id = ?';
    db.query(selectSql,work_id,(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.length == 0){
            return res.cc('查询失败',400);
        } else if(results[0].work_status == 1 ){
            return res.cc('已发布',404);
        } else {
            db.query(sql,work_id,(err,results)=>{
                if(err){
                    return res.cc(err.message);
                } else if(results.affectedRows != 1) {
                    return res.cc('发布失败',400);
                } else {
                    return res.cc('发布成功',200);
                }
            })
        }
    })
}
exports.delHomeWork = (req,res) =>{
    let work_id = req.query.work_id;
    const sql = 'delete from homework where work_id = ?';
    db.query(sql,work_id,(err,results)=>{
        if(err) {
            return res.cc(err.message);
        } else if(results.affectedRows!=1){
            return res.cc('删除失败',400);
        } else {
            return res.cc('删除成功',200);
        }
    })
}


exports.getStdScore = (req,res)=>{
    let pageNum = parseInt(req.query.pageNum)-1;
    let pageSize = parseInt(req.query.pageSize);
    let teacher_id = parseInt(req.query.teacher_id);
    const sql = 'select count(*) as total,t1.student_id,t1.student_name,t4.class_name,t2.score,t3.course_name from student t1 left join score t2 on t1.student_id = t2.student_id join course t3 on t2.course_id = t3.course_id join class t4 on t1.class_id = t4.class_id join teacher t5 on t3.course_id = t5.course_id where t5.teacher_id = ?';
    const slSql = 'select t1.student_id,t1.student_name,t4.class_name,t2.score,t3.course_id,t3.course_name from student t1 left join score t2 on t1.student_id = t2.student_id join course t3 on t2.course_id = t3.course_id join class t4 on t1.class_id = t4.class_id join teacher t5 on t3.course_id = t5.course_id where t5.teacher_id = ? limit ?,?';
    db.query(slSql,[teacher_id,pageNum*pageSize,pageSize],(err,results)=>{
        if(err) {
            return res.cc(err.message);
        } else if(results.length == 0){
            return res.cc('查询失败',404);
        }else {
            db.query(sql,teacher_id,(error,total)=>{
                if(error){
                    return res.cc(error.message);
                } else {
                    return res.send({
                        status:200,
                        message:'查询成功',
                        data:results,
                        total:total[0]['total']
                    })
                }
            })
        }
    })
}
exports.getClassStdScore = (req,res) =>{
    let pageNum = parseInt(req.query.pageNum)-1;
    let pageSize = parseInt(req.query.pageSize);
    const class_id = parseInt(req.query.class_id);
    const teacher_id = parseInt(req.query.teacher_id);
    const sql = 'select count(*) as total,t1.student_id,t1.student_name,t4.class_name,t2.score,t3.course_name from student t1 left join score t2 on t1.student_id = t2.student_id join course t3 on t2.course_id = t3.course_id join class t4 on t1.class_id = t4.class_id join teacher t5 on t3.course_id = t5.course_id where t5.teacher_id = ? and t1.class_id = ?';
    const slSql = 'select t1.student_id,t1.student_name,t4.class_name,t2.score,t3.course_id,t3.course_name from student t1 left join score t2 on t1.student_id = t2.student_id join course t3 on t2.course_id = t3.course_id join class t4 on t1.class_id = t4.class_id join teacher t5 on t3.course_id = t5.course_id where t5.teacher_id = ? and t1.class_id = ? limit ?,?';
    db.query(slSql,[teacher_id,class_id,pageNum*pageSize,pageSize],(err,results)=>{
        if(err) {
            return res.cc(err.message);
        } else if(results.length === 0 ){
            return res.cc('查询失败',404);
        } else {
            db.query(sql,[teacher_id,class_id],(error,total)=>{
                if(error){
                    return res.cc(error.message);
                } else {
                    return res.send({
                        status:200,
                        message:'查询成功',
                        data:results,
                        total:total[0]['total']
                    })
                }
            })
        }
    })
}
exports.changeStdScore = (req,res) =>{
    const student_id = parseInt(req.body.student_id);
    const score = parseInt(req.body.score);
    const course_id = parseInt(req.body.course_id);
    const sql = 'update score set score = ? where student_id = ? and course_id = ?';
    db.query(sql,[score,student_id,course_id],(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.affectedRows !== 1){
            console.log(results);
            return res.cc('修改失败',400);
        } else {
            return res.cc('修改成功',200);
        }
    })
}


exports.addNotice = (req,res) =>{
    const nowDate = new Date();
    const Notice_Info = {
        notice_id:req.body.notice_id,
        notice_theme:req.body.notice_theme,
        notice_details:req.body.notice_details,
        notice_time:nowDate,
        teacher_id:req.query.teacher_id,
    };
    const Checksql = 'select*from class_notice where notice_id = ?';
    const sql = 'insert into class_notice set ?';
    db.query(Checksql,Notice_Info.notice_id,(err,results) =>{
        if(err) {
            return res.cc(err.message);
        } else if(results.length>0){
            return res.cc('该公告号已被使用',402);
        } else {
            db.query(sql,Notice_Info,(error,result)=>{
                if(error){
                    return res.cc(error.message);
                } else if(result.affectedRows != 1) {
                    return res.cc('新增公告失败',400);
                } else {
                    return res.cc('新增公告成功',200);
                }
            })
        }
    })
}
exports.getNotice = (req,res) =>{
    let pageNum = parseInt(req.query.pageNum)-1;
    let pageSize = parseInt(req.query.pageSize);
    const teacher_id = req.query.teacher_id;
    const Allsql = 'select count(*) as total from class_notice where teacher_id = ?';
    const sql = 'select * from class_notice where teacher_id = ? limit ?,?';
    db.query(sql,[teacher_id,pageNum*pageSize,pageSize],(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.length ===0 ) {
            return res.cc('查询失败',400);
        } else {
            for(let i=0;i<results.length;i++) {
                if(results[i].notice_status===0 || results[i].notice_status===null){
                    results[i].notice_status = '未发布';
                } else{
                    results[i].notice_status = '已发布';
                }   
                results[i].notice_time = tools.formatDate(results[i].notice_time,'YYYY-MM-DD');
            }
            db.query(Allsql,teacher_id,(error,total)=>{
                if(error) {
                    return res.cc(error.message);
                } else {
                    return res.send({
                        status:200,
                        message:'查询成功',
                        data:results,
                        total:total[0]['total']
                    })
                }
            })
        }
    })
}
exports.commitNotice = (req,res) =>{
    let notice_id = req.body.id;
    console.log(notice_id);
    const sql = `update class_notice set notice_status = 1 where notice_id = ?`;
    const selectSql = 'select notice_status from class_notice where notice_id = ?';
    db.query(selectSql,notice_id,(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.length == 0){
            return res.cc('查询失败',400);
        } else if(results[0].notice_status === 1 ){
            return res.cc('已发布',404);
        } else {
            db.query(sql,notice_id,(error,result)=>{
                if(err){
                    return res.cc(error.message);
                } else if(result.affectedRows != 1) {
                    return res.cc('发布失败',400);
                } else {
                    return res.cc('发布成功',200);
                }
            })
        }
    })
}
exports.delNotice = (req,res)=>{
    let notice_id = req.query.notice_id;
    const sql = 'delete from class_notice where notice_id = ?';
    db.query(sql,notice_id,(err,results)=>{
        if(err) {
            return res.cc(err.message);
        } else if(results.affectedRows!=1){
            return res.cc('删除失败',400);
        } else {
            return res.cc('删除成功',200);
        }
    })
}
exports.changeNotice=(req,res)=>{
    let notice_id = req.body.notice_id;
    let notice_theme = req.body.notice_theme;
    let notice_details = req.body.notice_details;
    const changeInfo = {
        notice_theme,
        notice_details
    };
    const sql = 'update class_notice set ? where notice_id=?';
    db.query(sql,[changeInfo,notice_id],(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.affectedRows != 1){
            return res.cc('修改失败',400);
        } else{
            return res.cc('修改成功',200);
        }
    })
}

exports.getClassScore = (req,res) =>{
    const teacher_id = req.query.teacher_id;
    const sql = "select count(case when t1.score<60 then 'id' else null end) as d, count(case when t1.score >=60 and t1.score <70 then 'id' else null end) as c, count(case when t1.score>=70 and t1.score < 90 then 'id' else null end) as b,count(case when t1.score >= 90 and t1.score <=100 then 'id' else null end) as a from score t1 left join course t2 on t1.course_id = t2.course_id right join teacher t3 on t2.course_id = t3.course_id where t3.teacher_id = ?";
    db.query(sql,teacher_id,(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.length !== 1){
            return res.cc('获取成绩失败',400);
        } else {
            return res.send({
                status:200,
                message:'获取成绩成功',
                data:JSON.parse(JSON.stringify(results[0]))
            })
        }
    })
}

exports.getStudentEva = (req,res) =>{
    const teacher_id = req.query.teacher_id;
    const sql = 'select t1.student_id,t1.student_name,t1.sex,t2.class_name,t6.id,t6.content,t6.course_stars,t6.work_stars,t6.think_stars from student t1 left join class t2 on t1.class_id = t2.class_id left join score t3 on t1.student_id = t3.student_id left join course t4 on t3.course_id = t4.course_id left join teacher t5 on t4.course_id  = t5.course_id left join evaluate t6 on t1.student_id = t6.student_id where t5.teacher_id = ? limit ?,?';
    const sql1 = 'select count(*) as total,t1.student_id,t1.student_name,t1.sex,t2.class_name,t6.id,t6.content,t6.course_stars,t6.work_stars,t6.think_stars from student t1 left join class t2 on t1.class_id = t2.class_id left join score t3 on t1.student_id = t3.student_id left join course t4 on t3.course_id = t4.course_id left join teacher t5 on t4.course_id  = t5.course_id left join evaluate t6 on t1.student_id = t6.student_id where t5.teacher_id = ?';
    let pageNum = parseInt(req.query.pageNum)-1;
    let pageSize = parseInt(req.query.pageSize);
    db.query(sql,[teacher_id,pageNum*pageSize,pageSize],(err,results) =>{
        if(err){
            return res.cc(err,400);
        } else if(results.length == 0) {
            return res.cc('查询失败',404);
        } else{
            // for(let i=0;i<results.length;i++) {
            //     results[i].birthday = tools.formatDate(results[i].birthday,'YYYY-MM-DD');
            // }
            db.query(sql1,teacher_id,(error,total)=>{
                if(error){
                    return res.cc(error.message);
                } else {
                    res.send({
                        status:200,
                        message:'查询成功',
                        data:results,
                        total:total[0]['total']
                    })
                }
            })
        }
    })
}
exports.getClassStudentEva = (req,res) =>{
    const teacher_id = req.query.teacher_id;
    const class_id = req.query.class_id;
    const sql = 'select t1.student_id,t1.student_name,t1.sex,t2.class_name,t6.id,t6.content,t6.course_stars,t6.work_stars,t6.think_stars from student t1 left join class t2 on t1.class_id = t2.class_id left join score t3 on t1.student_id = t3.student_id left join course t4 on t3.course_id = t4.course_id left join teacher t5 on t4.course_id  = t5.course_id left join evaluate t6 on t1.student_id = t6.student_id where t5.teacher_id = ? and t1.class_id =? limit ?,?';
    const sql1 = 'select count(*) as total,t1.student_id,t1.student_name,t1.sex,t2.class_name,t6.id,t6.content,t6.course_stars,t6.work_stars,t6.think_stars from student t1 left join class t2 on t1.class_id = t2.class_id left join score t3 on t1.student_id = t3.student_id left join course t4 on t3.course_id = t4.course_id left join teacher t5 on t4.course_id  = t5.course_id left join evaluate t6 on t1.student_id = t6.student_id where t5.teacher_id = ? and t1.class_id =?';
    let pageNum = parseInt(req.query.pageNum)-1;
    let pageSize = parseInt(req.query.pageSize);
    db.query(sql,[teacher_id,class_id,pageNum*pageSize,pageSize],(err,results) =>{
        if(err){
            return res.cc(err,400);
        } else if(results.length == 0) {
            return res.cc('查询失败',404);
        } else{
            // for(let i=0;i<results.length;i++) {
            //     results[i].birthday = tools.formatDate(results[i].birthday,'YYYY-MM-DD');
            // }
            db.query(sql1,[teacher_id,class_id],(error,total)=>{
                if(error){
                    return res.cc(error.message);
                } else {
                    res.send({
                        status:200,
                        message:'查询成功',
                        data:results,
                        total:total[0]['total']
                    })
                }
            })
        }
    })
}
exports.getStudentEvaById = (req,res) =>{
    const id = req.query.id;
    const sql = 'select*from evaluate where id =?';
    db.query(sql,id,(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.length!==1){
            return res.cc('查询失败',400);
        } else {
            return res.send({
                status:200,
                message:'查询成功',
                data:results[0]
            })
        }
    })
}
exports.editEvaluate = (req,res) =>{
    const id = parseInt(req.body.id);
    const evaInfo = {
        content:req.body.content,
        course_stars: parseInt(req.body.course_stars),
        work_stars:parseInt(req.body.work_stars),
        think_stars:parseInt(req.body.think_stars),
    }
    const sql ='update evaluate set ? where id = ?';
    db.query(sql,[evaInfo,id],(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.affectedRows !== 1){
            return res.cc('修改失败',400);
        } else {
            return res.cc('修改成功',200);
        }
    })
}
exports.addEvaluate = (req,res) =>{
    const evaInfo = {
        content:req.body.content,
        course_stars:req.body.course_stars,
        work_stars:req.body.work_stars,
        think_stars:req.body.think_stars,
        teacher_id:parseInt(req.query.teacher_id),
        student_id:parseInt(req.query.student_id),
    }
    console.log(evaInfo);
    const sql = 'insert into evaluate set ?';
    db.query(sql,evaInfo,(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.affectedRows !== 1){
            return res.cc('新增评价失败',400);
        } else {
            return res.cc('新增评级成功',200)
        }
    })
}