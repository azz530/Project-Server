const db = require('../db/index.js');
const tools = require('../utils/tools.js');
exports.getUserInfo = async (req, res) => {
    const sqlGetUerInfo = 'select username,avatar,identity,usersign,tags,birthday,address,sex,identity_id from users where id=?';
    const id = req.query.id
    db.query(sqlGetUerInfo, id, (err, results) => {//查询用户信息
        if (err) {
            return res.cc(err);
        } else if (results.length !== 1) {
            return res.cc('获取用户信息失败');
        } else {
            results[0].birthday = tools.formatDate(results[0].birthday, 'YYYY-MM-DD');
            res.send({
                status: 200,
                message: '查询成功',
                data: results[0],
            })
        }
    });
}

exports.getUserID = async (req, res) => {
    const identity = req.query.identity;
    const identity_id = parseInt(req.query.identity_id);
    const sql1 = 'select student_id from student where student_id = ?';
    const sql2 = 'select teacher_id from teacher where teacher_id = ?';
    const sql3 = "select identity_id from users where identity_id = ? and identity ='学生'";
    const sql4 = "select identity_id from users where identity_id = ? and identity ='老师'";
    const changeStdUser = () => {
        db.query(sql1, identity_id, (mis1, result1) => {
            if (mis1) {
                return res.cc(mis1.message);
            } else if (result1.length === 0) {
                return res.cc('该学号不存在', 403)
            } else {
                db.query(sql3, identity_id, (mis2, result2) => {
                    if (mis2) {
                        return res.cc(mis2.message);
                    } else if (result2.length > 0) {
                        return res.cc('该学号已被绑定', 404);
                    } else {
                        return res.cc('查询成功', 200)
                    }
                })
            }
        })
    }
    const changeTUser = () => {
        db.query(sql2, identity_id, (mis1, result1) => {
            if (mis1) {
                return res.cc(mis1.message);
            } else if (result1.length === 0) {
                return res.cc('该教师号不存在', 405)
            } else {
                db.query(sql4, identity_id, (mis2, result2) => {
                    if (mis2) {
                        return res.cc(mis2.message);
                    } else if (result2.length > 0) {
                        return res.cc('该教师号已被绑定', 406);
                    } else {
                        return res.cc('查询成功', 200);
                    }
                })
            }
        })
    }
    if (identity === '学生') {
        changeStdUser();
    } else {
        changeTUser();
    }
}
exports.uploadAvatar = async (req, res) => {
    const url = 'http://localhost:3000/' + req.file.filename;
    const id = req.body.id;
    const sql = 'update users set avatar=? where id=?'
    db.query(sql, [url, id], (err, results) => {
        if (err) {
            return res.cc(err.message);
        } else if (results.affectedRows !== 1) {
            return res.cc('上传头像失败', 500);
        } else {
            return res.send({
                status: 200,
                message: '上传成功',
                avatarUrl: url
            })
        }
    })
}
exports.addTags = async (req, res) => {
    const id = req.query.id;
    const tag = req.body.tags;
    const upsql = "update users set tags = concat(tags,',',?) where id=?";
    const sql = 'select tags from users where id=?';
    const Sql = 'update users set tags = ? where id=?';
    db.query(sql, id, (error, result) => {
        if (error) {
            return res.cc(error.message);
        } else if (result[0].tags === '' || result[0].tags === null) {
            db.query(Sql, [tag, id], (err, results) => {
                if (err) {
                    return res.cc(err.message);
                } else if (results.affectedRows !== 1) {
                    return res.cc('新增标签失败', 400);
                } else {
                    return res.cc('新增标签成功', 200);
                }
            })
        } else {
            let str = result[0].tags.split(',');
            for (let i = 0; i < str.length; i++) {
                if (str[i] === tag) {
                    return res.cc('标签已存在', 402);
                }
            }
            db.query(upsql, [tag, id], (erro, resolve) => {
                if (erro) {
                    return res.cc(erro.message);
                } else if (resolve.affectedRows !== 1) {
                    return res.cc('新增标签失败', 400);
                } else {
                    return res.cc('新增标签成功', 200);
                }
            });
        }
    })
}
exports.delTags = async (req, res) => {
    let tagList = req.body;
    const id = req.query.id;
    let tag = tagList.join(',');
    const sql = 'update users set tags = ? where id = ?';
    db.query(sql, [tag, id], (err, results) => {
        if (err) {
            return res.cc(err.message);
        } else if (results.affectedRows !== 1) {
            return res.cc('删除标签失败', 400);
        } else {
            return res.cc('删除标签成功', 200);
        }
    })
}
exports.changeUserInfo = async (req, res) => {
    const id = req.query.id;
    const changeInfo = {
        username: req.body.username,
        sex: req.body.sex,
        birthday: req.body.birthday,
        usersign: req.body.usersign,
        address: req.body.address,
    }
    const sql = 'update users set ? where id =?';
    db.query(sql, [changeInfo, id], (err, results) => {
        if (err) {
            return res.cc(err.message);
        } else if (results.affectedRows !== 1) {
            return res.cc('修改用户信息失败', 400);
        } else {
            return res.cc('修改用户信息成功', 200);
        }
    })
}

exports.getNotice = async (req, res) => {
    const student_id = parseInt(req.query.student_id);
    let pageNum = parseInt(req.query.pageNum) - 1;
    let pageSize = parseInt(req.query.pageSize);
    const sql = 'select t1.notice_id,t1.notice_theme,t1.notice_details,t1.notice_time,t2.teacher_name from class_notice t1 left join teacher t2 on t1.teacher_id = t2.teacher_id join course t3 on t2.teacher_id = t3.teacher_id join score t4 on t3.course_id = t4.course_id  where t1.notice_status=1 and t4.student_id = ? order by t1.notice_time desc limit ?,?';
    const sql1 = 'select count(*) as total from class_notice t1 left join teacher t2 on t1.teacher_id = t2.teacher_id join course t3 on t2.teacher_id = t3.teacher_id join score t4 on t3.course_id = t4.course_id  where t1.notice_status=1 and t4.student_id = ? order by t1.notice_time desc';
    db.query(sql, [student_id,pageNum * pageSize, pageSize], (error, results) => {
        if (error) {
            return res.cc(error.message);
        } else if (results.length < 0) {
            return res.cc('查询失败', 400);
        } else {
            for (let i = 0; i < results.length; i++) {
                results[i].details_time = tools.formatDate(results[i].notice_time, 'YYYY-MM-DD hh:mm:ss');
                results[i].notice_time = tools.formatDate(results[i].notice_time, 'YYYY-MM-DD');
            }
            db.query(sql1,student_id,(err,total)=>{
                if(err){
                    return res.cc(err.message);
                } else {
                    return res.send({
                        status: 200,
                        message: '查询成功',
                        data: results,
                        total:total[0]['total'],
                    })
                }
            })
        }
    })


}
exports.getHomeWork = async (req, res) => {
    const student_id = parseInt(req.query.student_id);
    let pageNum = parseInt(req.query.pageNum) - 1;
    let pageSize = parseInt(req.query.pageSize);
    const sql = 'select t1.work_id,t1.work_name,t1.work_deadline,t1.work_time,t1.end_time,t1.work_details,t2.teacher_name,t3.course_name,t5.finishStatus,t5.eva_content,t5.stars from homework t1 left join teacher t2 on t1.teacher_id = t2.teacher_id join course t3 on t2.teacher_id = t3.teacher_id join score t4 on t3.course_id = t4.course_id left join workinfo t5 on t1.work_id = t5.work_id where t4.student_id = ? and t1.work_status = 1 order by t1.work_time desc limit ?,?';
    const sql1 = 'select count(*) as total from homework t1 left join teacher t2 on t1.teacher_id = t2.teacher_id join course t3 on t2.teacher_id = t3.teacher_id join score t4 on t3.course_id = t4.course_id left join workinfo t5 on t1.work_id = t5.work_id where t4.student_id = ? and t1.work_status = 1 order by t1.work_time desc';
    db.query(sql, [student_id,pageNum * pageSize, pageSize], (err, results) => {
        if (err) {
            return res.cc(err.message);
        } else if (results.length < 0) {
            return res.cc('查询失败', 400);
        } else {
            for (let i = 0; i < results.length; i++) {
                results[i].details_time = tools.formatDate(results[i].work_time, 'YYYY-MM-DD hh:mm:ss');
                results[i].work_time = tools.formatDate(results[i].work_time, 'YYYY-MM-DD hh:mm:ss');
                results[i].end_time = tools.formatDate(results[i].end_time, 'YYYY-MM-DD');
            }
            db.query(sql1,student_id,(err,total)=>{
                if(err){
                    return res.cc(err.message);
                } else {
                    return res.send({
                        status: 200,
                        message: '查询成功',
                        data: results,
                        total:total[0]['total'],
                    })
                }
            })
        }
    })
}
exports.getDetailsHW = async (req, res) => {
    const work_id = req.query.work_id;
    const sql = 'select t1.work_id,t1.work_name,t1.work_details,t1.end_time,t2.work_pic,t2.work_content,t2.finishStatus from homework t1 left join workinfo t2 on t1.work_id = t2.work_id where t1.work_id = ?';
    db.query(sql, work_id, (err, results) => {
        if (err) {
            return res.cc(err.message);
        } else if (results.length < 0) {
            return res.cc('查询失败', 400);
        } else {

            results[0].end_time = tools.formatDate(results[0].end_time, 'YYYY-MM-DD');
            if (results[0].work_status === 1) {
                results[0].work_status = true;
            } else {
                results[0].work_status = false;
            }

            return res.send({
                status: 200,
                message: '查询成功',
                data: results[0],
            })
        }
    })
}
exports.commitHomeWork = async (req, res) => {
    const baseurl = 'http://localhost:3000/';
    const work_id = parseInt(req.body.work_id);
    const student_id = parseInt(req.body.student_id);
    const work_content = req.body.work_content;
    let work_pic = '';
    for (let i = 0; i < req.files.length; i++) {
        let PicUrl = baseurl + req.files[i].filename;
        work_pic += PicUrl + ',';
    }
    work_pic = work_pic.substring(0, work_pic.lastIndexOf(','));
    let work_info = {
        student_id,
        work_id,
        work_pic,
        finishStatus: 1,
        work_content,
        time: new Date(),
    }
    const sql = 'insert into workinfo set ?'
    const sql1 = 'update homework set finish_num = (select count(*) from workinfo where finishStatus = 1 and work_id = ?) where work_id = ?'
    db.query(sql, work_info, (err, results) => {
        if (err) {
            return res.cc(err.message);
        } else if (results.affectedRows !== 1) {
            return res.cc('插入数据失败', 400);
        } else {
            db.query(sql1, [work_id, work_id], (error, result) => {
                if (error) {
                    return res.cc(error.message);
                } else if (result.affectedRows !== 1) {
                    return res.cc('更新作业完成人数失败', 400);
                } else {
                    return res.send({
                        status: 200,
                        message: '插入成功',
                        picurl: work_pic,
                    })
                }
            })
        }
    })
}
exports.getScoreData = async (req, res) => {
    const student_id = parseInt(req.query.student_id);
    const exam_id = parseInt(req.query.exam_id);
    const sql2 = 'select t1.score,t2.course_name from score t1 left join course t2 on t1.course_id = t2.course_id where t1.student_id = ? and t1.exam_id = ?';
    db.query(sql2, [student_id, exam_id], (err, results) => {
        if (err) {
            return res.cc(err.message);
        } else if (results.length === 0) {
            return res.cc('查询失败', 402);
        } else {
            return res.send({
                status: 200,
                message: '查询成功',
                data: results,
            })
        }
    })

}

exports.addActivity = async (req, res) => {
    const Info = {
        name: req.body.name,
        userid: req.query.id,
        actime: req.body.actime,
    }
    const sql = 'insert into activity set ?';
    db.query(sql, Info, (err, results) => {
        if (err) {
            return res.cc(err.message);
        } else if (results.affectedRows !== 1) {
            return res.cc('新增失败', 400);
        } else {
            return res.cc('新增成功', 200);
        }
    })
}
exports.getActivity = async (req, res) => {
    const userid = req.query.id;
    const sql = 'select * from activity where userid = ?';
    db.query(sql, userid, (err, results) => {
        if (err) {
            return res.cc(err.message);
        } else if (results.length === 0) {
            return res.cc('查询失败', 400);
        } else {
            results = JSON.parse(JSON.stringify(results));
            results.forEach(i => {
                i.actime = tools.formatDate(i.actime, 'YYYY-MM-DD');
            });
            return res.send({
                status: 200,
                message: '查询成功',
                data: results,
            })
        }
    })
}
exports.getMyCourse = async (req, res) => {
    const student_id = req.query.student_id;
    let pageNum = parseInt(req.query.pageNum) - 1;
    let pageSize = parseInt(req.query.pageSize);
    const sql1 = 'select count(*) as total from course t1 join teacher t2 on t1.teacher_id = t2.teacher_id join score t3 on t1.course_id = t3.course_id where t3.student_id = ?'
    const sql = 'select t1.course_id,t1.course_name,t2.teacher_name from course t1 join teacher t2 on t1.teacher_id = t2.teacher_id join score t3 on t1.course_id = t3.course_id where t3.student_id = ? limit ?,?';
    db.query(sql, [student_id, pageNum * pageSize, pageSize], (err, results) => {
        if (err) {
            return res.cc(err.message);
        } else if (results.length <= 0) {
            return res.cc('为查询到课程', 400);
        } else {
            results = JSON.parse(JSON.stringify(results));
            db.query(sql1, student_id, (error, total) => {
                if (error) {
                    return res.cc(error.message);
                } else {
                    return res.send({
                        status: 200,
                        message: '查询成功',
                        data: results,
                        total:total[0]['total'],
                    })
                }
            })

        }
    })
}

exports.getExamInfo = async (req, res) => {
    let pageNum = parseInt(req.query.pageNum) - 1;
    let pageSize = parseInt(req.query.pageSize);
    const sql = 'select * from exam order by time desc limit ?,?';
    const sql1 = 'select count(*) as total from exam order by time desc';
    db.query(sql,[pageNum * pageSize, pageSize], (err, results) => {
        if (err) {
            return res.cc(err.message);
        } else if (results.length === 0) {
            return res.cc('查询失败', 400);
        } else {
            results = JSON.parse(JSON.stringify(results));
            results.map((i) => {
                i.start_time = tools.formatDate(i.start_time, 'YYYY-MM-DD');
                i.end_time = tools.formatDate(i.end_time, 'YYYY-MM-DD');
            })
            db.query(sql1,(error,total)=>{
                if(error){
                    return res.cc(error.message);
                } else {
                    return res.send({
                        status: 200,
                        message: '查询成功',
                        data: results,
                        total:total[0]['total'],
                    })
                }
            })
        }
    })
}
exports.getStdEva = async (req, res) => {
    const student_id = req.query.student_id;
    let pageNum = parseInt(req.query.pageNum) - 1;
    let pageSize = parseInt(req.query.pageSize);
    const sql = 'select * from evaluate t1 left join teacher t2 on t1.teacher_id = t2.teacher_id where t1.student_id = ? order by public_time desc limit ?,?';
    const sql1 = 'select count(*) as total from evaluate t1 left join teacher t2 on t1.teacher_id = t2.teacher_id where t1.student_id = ? order by public_time desc';
    db.query(sql, [student_id,pageNum * pageSize, pageSize], (err, results) => {
        if (err) {
            return res.cc(err.message);
        } else if (results.length <= 0) {
            return res.cc('查询失败', 400);
        } else {
            results = JSON.parse(JSON.stringify(results));
            results.map(item => {
                item.public_time = tools.formatDate(item.public_time, 'YYYY年MM月DD日');
            })
            db.query(sql1,student_id,(err,total)=>{
                if(err){
                    return res.cc(err.message);
                } else {
                    return res.send({
                        status: 200,
                        message: '查询成功',
                        data: results,
                        total:total[0]['total'],
                    })
                }
            })
        }
    })
}

exports.getChildrenInfo = async (req, res) => {
    const student_id = req.query.student_id;
    const sql = 'select t1.id,t1.work_pic,t1.work_content,t1.time,t2.work_name,t2.work_details,t2.work_time,t2.end_time,t3.teacher_name,t4.course_name,t1.stars,t1.eva_content from workinfo t1 join homework t2 on t1.work_id = t2.work_id join teacher t3 on t2.teacher_id = t3.teacher_id join course t4 on t3.teacher_id = t4.teacher_id where t1.student_id = ? order by time desc';
    const sql1 = 'select * from evaluate t1 right join teacher t2 on t1.teacher_id = t2.teacher_id where student_id = ? order by public_time desc';
    const sql2 = 'select * from exam order by time desc';
    db.query(sql, student_id, (err, results1) => {
        if (err) {
            return res.cc(err.message);
        } else if (results1.length <= 0) {
            return res.cc('查询失败', 400);
        } else {
            results1 = JSON.parse(JSON.stringify(results1));
            results1.map(item => {
                item.time = tools.formatDate(item.time, 'YYYY-MM-DD hh:mm:ss');
                item.work_time = tools.formatDate(item.work_time, 'YYYY-MM-DD hh:mm:ss');
                item.end_time = tools.formatDate(item.end_time, 'YYYY-MM-DD hh:mm:ss');
                if (item.work_pic) {
                    item.work_pic = item.work_pic.split(',');
                }
            })
            db.query(sql1, student_id, (err2, result2) => {
                if (err2) {
                    return res.cc(err2.message);
                } else if (result2.length <= 0) {
                    return res.cc('查询失败', 400);
                } else {
                    result2 = JSON.parse(JSON.stringify(result2));
                    result2.map(item => {
                        item.public_time = tools.formatDate(item.public_time, 'YYYY-MM-DD hh:mm:ss');
                    })
                    db.query(sql2,(err3,result3)=>{
                        if(err3){
                            return res.cc(err3.message);
                        } else if(result3.length <= 0){
                            return res.cc('查询失败',400);
                        } else {
                            result3 = JSON.parse(JSON.stringify(result3));
                            result3.map(item =>{
                                item.start_time = tools.formatDate(item.start_time,'YYYY-MM-DD');
                                item.end_time = tools.formatDate(item.end_time,'YYYY-MM-DD');
                            })
                            return res.send({
                                status: 200,
                                message: '查询成功',
                                workList: results1,
                                evaList: result2,
                                examList:result3,
                            })
                        }
                    })
                }
            })
        }
    })
}

exports.getAllDiscuss = async(req,res)=>{
    let pageNum = parseInt(req.query.pageNum) - 1;
    let pageSize = parseInt(req.query.pageSize);
    const sql = 'select *from discuss order by discuss_time desc limit ?,?';
    const sql1 = 'select count(*) as total from discuss';
    db.query(sql,[pageNum*pageSize,pageSize],(err,result)=>{
        if(err){
            return res.cc(err.message);
        } else if(result.length<=0){
            return res.cc('未查到讨论信息',400);
        } else {
            result = JSON.parse(JSON.stringify(result));
            result.map(item=>{
                item.discuss_time = tools.formatDate(item.discuss_time,'YYYY-MM-DD HH:mm:ss')
            })
            db.query(sql1,(err1,total)=>{
                if(err1){
                    return res.cc(err1.message);
                } else {
                    return res.send({
                        status:200,
                        message:'查询成功',
                        data:result,
                        total:total[0]['total'],
                    })
                }
            })
        }
    })
}
exports.addDiscuss = async(req,res) =>{
    const DiscussInfo = req.body;
    DiscussInfo.discuss_time = new Date();
    const sql = 'insert into discuss set ?';
    db.query(sql,DiscussInfo,(err,result)=>{
        if(err){
            return res.cc(err.message);
        } else if(result.affectedRows !== 1){
            return res.cc('新增讨论失败',400);
        } else {
            return res.cc('新增讨论成功',200);
        }
    })
}

exports.getDiscussDetails = async(req,res)=>{
    const discuss_id = req.query.discuss_id;
    const sql = 'select t1.discuss_id,t1.discuss_title,t1.discuss_tags,t1.discuss_time,t1.discuss_content,t2.username,t2.avatar from discuss t1 left join users t2 on t1.user_id = t2.id where t1.discuss_id = ?'
    db.query(sql,discuss_id,(err,result)=>{
        if(err){
            return res.cc(err.message);
        } else if(result.length !== 1){
            return res.cc('查询错误',400);
        } else {
            result = JSON.parse(JSON.stringify(result));
            result[0].discuss_time = tools.formatDate(result[0].discuss_time,'YYYY-MM-DD HH:mm:ss')
            return res.send({
                status:200,
                message:'查询成功',
                data:result[0],
            })
        }
    })
}
exports.getDiscussComments = async(req,res) =>{
    const discuss_id = req.query.discuss_id;
    const sql = 'select t1.comments_id,t1.comments_content,t1.comments_time,t3.id,t3.username,t3.avatar from comments t1 join discuss t2 on t1.comments_discussId = t2.discuss_id join users t3 on t1.comments_uid = t3.id where t2.discuss_id = ?'
    const sql_replay = 'select replay.replay_id,replay.replay_content,replay.replay_time,replay.comments_id,fromUser.id as fromUid,fromUser.username as fromUsername,fromUser.avatar as fromAvatar,toUser.id as toUid,toUser.username as toUsername,toUser.avatar as toAvatar from replay left join comments on replay.comments_id = comments.comments_id left join discuss on comments.comments_discussId = discuss.discuss_id left join users fromUser on replay.from_uid = fromUser.id left join users toUser on replay.to_uid = toUser.id where discuss.discuss_id = ? order by replay.replay_time asc'
    db.query(sql,discuss_id,(err,result)=>{
        if(err){
            return res.cc(err.message);
        } else if(result.length <= 0){
            return res.cc('查询错误',400);
        } else {
            result = JSON.parse(JSON.stringify(result));
            db.query(sql_replay,discuss_id,(err1,result1)=>{
                if(err1){
                    return res.cc(err1.message)
                } else {
                    result1 = JSON.parse(JSON.stringify(result1));
                    const newResult = result.map(item=>{
                        item.comments_time = tools.formatDate(item.comments_time,'YYYY-MM-DD HH:mm:ss')
                        const obj = {...item};
                        const commentsArr = result1.filter(i => i.comments_id === item.comments_id);
                        obj.replay = commentsArr;
                        return obj;
                    })
                    newResult.map(item=>{
                        item.replay.map(i=>{
                            i.replay_time = tools.formatDate(i.replay_time,'YYYY-MM-DD HH:mm:ss')
                        })
                    })
                    return res.send({
                        status:200,
                        message:'查询成功',
                        data:newResult,
                    })
                }
            })
        }
    })
}

exports.addDiscussComments = async(req,res) =>{
    const commentsInfo = {
        comments_content:req.body.comments_content,
        comments_time:new Date(),
        comments_uid:req.body.id,
        comments_discussId:req.body.discuss_id,
    };
    const sql = 'insert into comments set ?';
    db.query(sql,commentsInfo,(err,result)=>{
        if(err){
            return res.cc(err.message);
        } else if(result.affectedRows !== 1){
            return res.cc('新增评论失败',400);
        } else {
            return res.cc('新增评论成功',200);
        }
    })
}
exports.addReplay = async(req,res) =>{
    const replayInfo = {
        comments_id:parseInt(req.body.comments_id),
        from_uid:parseInt(req.body.from_uid),
        replay_content:req.body.replay_content,
        to_uid:parseInt(req.body.to_uid),
        replay_time:new Date(),
    };
    const sql = 'insert into replay set ?';
    db.query(sql,replayInfo,(err,result)=>{
        if(err){
            return res.cc(err.message);
        } else if(result.affectedRows !== 1){
            return res.cc('回复失败',400);
        } else {
            return res.cc('回复成功',200);
        }
    })

}