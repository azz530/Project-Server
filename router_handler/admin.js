const db = require('../db/index.js');
const tools = require('../utils/tools.js');

exports.getClass = (req,res) =>{
    const sql = 'select class_id,class_name from class';
    db.query(sql,(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if (results.length<0){
            return res.cc('查询失败',400);
        } else {
            results = JSON.parse(JSON.stringify(results));
            return res.send({
                status:200,
                message:'查询成功',
                data:results
            })
        }
    })
}
exports.getStudentList = (req,res) =>{
    let pageNum = parseInt(req.query.pageNum)-1;
    let pageSize = parseInt(req.query.pageSize);
    const sql = 'select t1.student_id,t1.student_name,t1.sex,t1.birthday,t1.address,t2.class_name from student t1 left join class t2 on t1.class_id = t2.class_id limit ?,?';
    const sql2 = 'select count(*) as total,t1.student_id,t1.student_name,t1.sex,t1.birthday,t1.address,t2.class_name from student t1 left join class t2 on t1.class_id = t2.class_id';
    db.query(sql,[pageNum*pageSize,pageSize],(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.length<0){
            return res.cc('查询失败',400);
        } else {
            for(let i=0;i<results.length;i++) {  
                results[i].birthday = tools.formatDate(results[i].birthday,'YYYY-MM-DD');
            }
            db.query(sql2,(error,total)=>{
                if(error){
                    return res.cc(error.message);
                } else {
                    return res.send({
                        status:200,
                        message:'查询成功',
                        data:results,
                        total:total[0]['total'],
                    })
                }
            })
        }
    })
}
exports.addStudent = (req,res)=>{
    const studentInfo = {
        student_id:parseInt(req.body.student_id),
        student_name:req.body.student_name,
        sex:req.body.sex,
        birthday:req.body.birthday,
        address:req.body.address
    }
    const class_name=req.body.class_name;
    const sql1 = 'select class_id from class where class_name =?';
    const selectSql = 'select *from student where student_id =?';
    const sql = 'insert into student set ?';
    db.query(selectSql,studentInfo.student_id,(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.length>0){
            return res.cc('该学号已被使用',402);
        } else {
            db.query(sql1,class_name,(error,class_id)=>{
                if(error){
                    return res.cc(error.message);
                } else if(class_id.length!==1){
                    return res.cc('查询失败',400);
                } else {
                    class_id = JSON.parse(JSON.stringify(class_id));
                    studentInfo.class_id = class_id[0].class_id;
                    db.query(sql,studentInfo,(mis,result)=>{
                        if(mis) {
                            return res.cc(mis.message);
                        } else if(result.affectedRows !==1) {
                            return res.cc('新增学生失败',400);
                        } else {
                            return res.cc('新增学生成功',200);
                        }
                    })
                }
            })
        }
    })
}
exports.changeStudent = (req,res) =>{
    const changeInfo = {
        student_name:req.body.student_name,
        sex:req.body.sex,
        birthday:req.body.birthday,
        address:req.body.address
    }
    const class_name=req.body.class_name;
    const sql1 = 'select class_id from class where class_name =?';
    let student_id = parseInt(req.body.student_id);
    const sql = 'update student set ? where student_id=?';
    db.query(sql1,class_name,(error,class_id)=>{
        if(error){
            return res.cc(error.message);
        } else if(class_id.length!==1){
            return res.cc('查询失败',400);
        } else {
            class_id = JSON.parse(JSON.stringify(class_id));
            changeInfo.class_id = class_id[0].class_id;
            db.query(sql,[changeInfo,student_id],(err,results)=>{
                if(err){
                    return res.cc(err.message);
                } else if (results.affectedRows !== 1){
                    return res.cc('修改学生信息失败',400);
                } else {
                    return res.cc('修改学生信息成功',200);
                }
            })
        }
    })
}
exports.delStudent = (req,res) =>{
    let student_id = req.query.student_id;
    const sql = 'delete from student where student_id = ?';
    db.query(sql,student_id,(err,results)=>{
        if(err) {
            return res.cc(err.message);
        } else if(results.affectedRows!==1){
            return res.cc('删除失败',400);
        } else {
            return res.cc('删除成功',200);
        }
    })
}
exports.getGradeInfo = (req,res) =>{
    const sql = 'select grade.grade_id,grade.grade_name,(select count(*) from class where grade.grade_id = class.grade_id) as class_num,(select count(*)from student where grade.grade_name = student.grade_name) as student_num,teacher_name from grade left join teacher on grade.teacher_id = teacher.teacher_id';
    db.query(sql,(err,results)=>{
        if(err) {
            return res.cc(err.message);
        } else if (results.length<0){
            return res.cc('查询失败',400);
        } else {
            return res.send({
                status:200,
                message:'查询成功',
                data:results
            })
        }
    })
}
exports.getClassInfo =(req,res) =>{
    let pageNum = parseInt(req.query.pageNum)-1;
    let pageSize = parseInt(req.query.pageSize);
    const allSql = 'select count(class_id) as total  from class';
    const sql = 'select class_id,class_name,(select count(*) from student where student.class_id = class.class_id) as student_num,(select teacher_name from teacher where class.teacher_id = teacher.teacher_id) as teacher_name from class limit ?,?';
    db.query(sql,[pageNum*pageSize,pageSize],(err,results)=>{
        if(err) {
            return res.cc(err.message);
        } else if (results.length<0){
            return res.cc('查询失败',400);
        } else {
            db.query(allSql,(error,total)=>{
                if(error){
                    return res.cc(error.message);
                } else {
                    res.send({     
                        status:200,
                        message:'查询成功', 
                        data:results,
                        total:total[0]['total'],
                    })
                }
            })
        }
    })
}
exports.getClassStd = (req,res) =>{
    const class_id = req.query.class_id;
    let pageNum = parseInt(req.query.pageNum)-1;
    let pageSize = parseInt(req.query.pageSize);
    const sql = 'select student_id,student_name,sex from student where class_id = ? limit ?,?';
    const sql2 = 'select count(*) as total,student_id,student_name,sex from student where class_id = ?';
    db.query(sql,[class_id,pageNum*pageSize,pageSize],(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.length<0){
            return res.cc('查询失败',400);
        } else {
            results = JSON.parse(JSON.stringify(results));
            db.query(sql2,class_id,(error,total)=>{
                if(error){
                    return res.cc(error.message);
                } else{
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
exports.getTeacherInfo = (req,res) =>{
    let pageNum = parseInt(req.query.pageNum)-1;
    let pageSize = parseInt(req.query.pageSize);
    const sqlTotal = 'select count(*) as total,t1.teacher_id,t1.teacher_name,t1.sex,t2.course_name from teacher t1 join course t2 on t1.course_id = t2.course_id';
    const sql = 'select t1.teacher_id,t1.teacher_name,t1.sex,t2.course_name from teacher t1 join course t2 on t1.course_id = t2.course_id order by t1.teacher_id limit ?,?';
    db.query(sql,[pageNum*pageSize,pageSize],(err,results)=>{
        if(err) {
            return res.cc(err.message);
        } else if(results.length<0){
            return res.cc('查询失败',4011);
        } else {
            db.query(sqlTotal,(error,total)=>{
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
exports.addTeacher = (req,res) =>{
    const TeacherInfo = {
        teacher_id: parseInt(req.body.teacher_id),
        teacher_name:req.body.teacher_name,
        sex:req.body.sex, 
    }
    const course_name=req.body.course_name;
    const sql1 = 'select course_id from course where course_name =?';
    const selSql = 'select *from teacher where teacher_id =?';
    const sql = 'insert into teacher set ?';
    db.query(selSql,TeacherInfo.teacher_id,(err,results)=>{
        if(err) {
            return res.cc(err.message);
        } else if(results.length>0){
            return res.cc('该工号已存在',402);
        } else {
            db.query(sql1,course_name,(mis,course_id)=>{
                if(mis){
                    return res.cc(mis.message);
                } else if(course_id.length!==1){
                    return res.cc('查询失败',400);
                } else {
                    course_id = JSON.parse(JSON.stringify(course_id));
                    TeacherInfo.course_id = course_id[0].course_id;
                    db.query(sql,TeacherInfo,(error,result)=>{
                        if(error) {
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
    })
}
exports.changeTeacherInfo = (req,res) =>{
    let teacher_id = parseInt(req.body.teacher_id);
    const course_name = req.body.course_name;
    const changeInfo = {
        teacher_name:req.body.teacher_name,
        sex:req.body.sex,
    }
    const sql1 = 'select course_id from course where course_name =?'
    const sql = 'update teacher set ? where teacher_id =?';
    db.query(sql1,course_name,(mis,course_id)=>{
        if(mis){
            return res.cc(mis.message);
        } else if(course_id.length!==1){
            return res.cc('查询失败',400);
        } else {
            course_id = JSON.parse(JSON.stringify(course_id));
            changeInfo.course_id = course_id[0].course_id;
            db.query(sql,[changeInfo,teacher_id],(err,results)=>{
                if(err) {
                    return res.cc(err.message);
                } else if(results.affectedRows !== 1){
                    return res.cc('修改失败',400);
                } else {
                    return res.cc('修改成功',200);
                }
            })
        }
    })
}
exports.getCourse = (req,res) =>{
    const sql = 'select* from course';
    db.query(sql,(err,results)=>{
        if(err) {
            return res.cc(err.message);
        } else if(results.length<0){
            return res.cc('查询失败',400);
        } else {
            return res.send({
                status:200,
                message:'查询成功',
                data:results
            })
        }
    })
}
exports.delTeacher = (req,res) => {
    let teacher_id = req.query.teacher_id;
    const sql = 'delete from teacher where teacher_id = ?';
    db.query(sql,teacher_id,(err,results)=>{
        if(err) {
            return res.cc(err.message);
        } else if(results.affectedRows!==1){
            return res.cc('删除失败',400);
        } else {
            return res.cc('删除成功',200);
        }
    })
}
exports.addCourse = (req,res) => {
    const CourseInfo = {
        course_id: parseInt(req.body.course_id),
        course_name:req.body.course_name,
        course_message:req.body.course_message
    }
    const Sql = 'select *from course where course_id =?';
    const sql = 'insert into course set ?';
    db.query(Sql,CourseInfo.course_id,(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.length>0){
            return res.cc('该课程号已被使用',402);
        } else {
            db.query(sql,CourseInfo,(error,result)=>{
                if(error){
                    return res.cc(error.message);
                } else if(result.affectedRows!==1) {
                    return res.cc('新增课程失败',400);
                } else {
                    return res.cc('新增课程成功',200);
                }
            })
        }
    })
}
exports.getCourseInfo = (req,res) =>{
    let pageNum = parseInt(req.query.pageNum)-1;
    let pageSize = parseInt(req.query.pageSize);
    const Sql = 'select count(*) as total from course';
    const sql = 'select* from course limit ?,?';
    db.query(sql,[pageNum*pageSize,pageSize],(err,results)=>{
        if(err) {
            return res.cc(err.message);
        } else if(results.length<0){
            return res.cc('查询失败',400);
        } else {
            db.query(Sql,(error,total)=>{
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
exports.changeCourseInfo =(req,res)=>{
    let course_id = parseInt(req.body.course_id);
    const changeInfo = {
        course_name:req.body.course_name,
        course_message:req.body.course_message
    }
    const sql = 'update course set ? where course_id =?';
    db.query(sql,[changeInfo,course_id],(err,results)=>{
        if(err) {
            return res.cc(err.message);
        } else if(results.affectedRows !== 1){
            return res.cc('修改失败',400);
        } else {
            return res.cc('修改成功',200);
        }
    })
}
exports.delCourse = (req,res) =>{
    let course_id = req.query.course_id;
    const sql = 'delete from course where course_id = ?';
    db.query(sql,course_id,(err,results)=>{
        if(err) {
            return res.cc(err.message);
        } else if(results.affectedRows!==1){
            return res.cc('删除失败',400);
        } else {
            return res.cc('删除成功',200);
        }
    })
}
