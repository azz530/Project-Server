const db = require('../db/index.js');
const tools = require('../utils/tools.js');
exports.getStudentListByClass = (req,res)=>{
    const classes = req.query.classes;
    let pageNum = parseInt(req.query.pageNum)-1;
    let pageSize = parseInt(req.query.pageSize);
    const allSql = 'select count(*) as total from student where classes = ? ';
    const slSql = 'select * from student where classes = ? limit ?,?';
    db.query(slSql,[classes,pageNum*pageSize,pageSize],(err,results)=>{
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
            db.query(allSql,classes,(error,total) =>{
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

exports.getStudentList = (req,res)=>{
    let pageNum = parseInt(req.query.pageNum)-1;
    let pageSize = parseInt(req.query.pageSize);
    const slSql = 'select * from student limit ?,?';
    const allSql = 'select count(*) as total from student';
    db.query(slSql,[pageNum*pageSize,pageSize],(err,results) =>{
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
            db.query(allSql,(error,total)=>{
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
        classes:req.body.classes,
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
    const slSql = 'select * from homework order by work_time desc limit ?,?';
    const sql = 'select count(*) as total from homework ';
    db.query(slSql,[pageNum*pageSize,pageSize],(err,results)=>{
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
            db.query(sql,(error,total)=>{
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
    let work_name = req.body.work_name;
    let work_details = req.body.work_details;
    let work_deadline = req.body.work_deadline;
    const sql = 'update homework set work_name=?,work_details=?,work_deadline=? where work_id=?';
    db.query(sql,[work_name,work_details,work_deadline,work_id],(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.affectedRows != 1){
            return res.cc('修改失败',400);
        } else{
            return res.cc('修改成功',200);
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
    const sql = 'select count(*) as total,t1.student_id,t1.student_name,t1.classes,t3.score,t2.course_name from student t1 left join score t3 on t1.student_id = t3.student_id join course t2 on t2.course_id = t3.course_id;';
    const slSql = 'select t1.student_id,t1.student_name,t1.classes,t3.score,t2.course_name from student t1 left join score t3 on t1.student_id = t3.student_id join course t2 on t2.course_id = t3.course_id limit 0,2;';
    db.query(slSql,[pageNum*pageSize,pageSize],(err,results)=>{
        if(err) {
            return res.cc(err.message);
        } else if(results.length == 0){
            return res.cc('查询失败',404);
        }else {
            db.query(sql,(error,total)=>{
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
exports.getCourseStdScore = (req,res) =>{
    let pageNum = parseInt(req.query.pageNum)-1;
    let pageSize = parseInt(req.query.pageSize);
    const course_name = req.query.course_name;
    const sql = 'select count(*) as total,t1.student_id,t1.student_name,t1.classes,t3.score,t2.course_name from student t1 left join score t3 on t1.student_id = t3.student_id join course t2 on t2.course_id = t3.course_id where course_name = ?';
    const slSql = 'select t1.student_id,t1.student_name,t1.classes,t3.score,t2.course_name from student t1 left join score t3 on t1.student_id = t3.student_id join course t2 on t2.course_id = t3.course_id where course_name = ? limit ?,?';
    db.query(slSql,[course_name,pageNum*pageSize,pageSize],(err,results)=>{
        if(err) {
            return res.cc(err.message);
        } else if(results.length == 0 ){
            return res.cc('查询失败',404);
        } else {
            db.query(sql,course_name,(error,total)=>{
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
exports.addNotice = (req,res) =>{
    const nowDate = new Date();
    const Notice_Info = {
        notice_id:req.body.notice_id,
        notice_theme:req.body.notice_theme,
        notice_details:req.body.notice_details,
        notice_time:nowDate,
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
    const Allsql = 'select count(*) as total from class_notice';
    const sql = 'select * from class_notice limit ?,?';
    db.query(sql,[pageNum*pageSize,pageSize],(err,results)=>{
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
            db.query(Allsql,(error,total)=>{
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