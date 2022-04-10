const db = require('../db/index.js');
const tools = require('../utils/tools.js');
exports.getUserInfo = (req, res) => {
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
exports.getUserID = (req,res) =>{
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
                        return res.cc('查询成功',200)
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
                        return res.cc('查询成功',200);
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
exports.checkIdentity = async (req, res) => {
    const student_id = parseInt(req.query.student_id);
    const sql = 'select student_name,class_name,grade_name from student where student_id =?';
    const checksql = 'select *from users where identity_id =?';
    db.query(checksql, student_id, (err, results) => {
        if (err) {
            return res.cc(err.message);
        } else if (results.length === 1) {
            return res.cc('该学号已被绑定', 402);
        } else {
            db.query(sql, student_id, (error, result) => {
                if (error) {
                    return res.cc(error.message);
                } else if (result.length !== 1) {
                    return res.cc('认证失败', 400);
                } else {
                    return res.send({
                        status: 200,
                        message: '认证成功',
                        data: result[0],
                    })
                }
            })
        }
    })
}
exports.commitIDResult = async (req, res) => {
    const id = req.query.id;
    const identity_id = parseInt(req.body.identity_id);
    const sql = 'update users set identity_id = ? where id=?';
    db.query(sql, [identity_id, id], (err, results) => {
        if (err) {
            return res.cc(err.message);
        } else if (results.affectedRows !== 1) {
            return res.cc('确认失败', 400);
        } else {
            return res.cc('确认成功', 200);
        }
    })
}
exports.getNotice = async (req, res) => {
    const student_id = parseInt(req.query.student_id);
    const sql = 'select t1.notice_id,t1.notice_theme,t1.notice_details,t1.notice_time,t2.teacher_name from class_notice t1 left join teacher t2 on t1.teacher_id = t2.teacher_id join course t3 on t2.course_id = t3.course_id join score t4 on t3.course_id = t4.course_id  where t1.notice_status=1 and t4.student_id = ? order by t1.notice_time desc limit 0,5';
    db.query(sql, student_id, (error, results) => {
        if (error) {
            return res.cc(error.message);
        } else if (results.length < 0) {
            return res.cc('查询失败', 400);
        } else {
            for (let i = 0; i < results.length; i++) {
                results[i].details_time = tools.formatDate(results[i].notice_time, 'YYYY-MM-DD hh:mm:ss');
                results[i].notice_time = tools.formatDate(results[i].notice_time, 'YYYY-MM-DD');
            }
            return res.send({
                status: 200,
                message: '查询成功',
                data: results
            })
        }
    })


}
exports.getHomeWork = async (req, res) => {
    const student_id = parseInt(req.query.student_id);
    const sql = 'select t1.work_id,t1.work_name,t1.work_deadline,t1.work_time,t1.end_time,t1.work_details,t2.teacher_name,t3.course_name from homework t1 left join teacher t2 on t1.teacher_id = t2.teacher_id join course t3 on t2.course_id = t3.course_id join score t4 on t3.course_id = t4.course_id where t4.student_id = ? and t1.work_status = 1 order by t1.work_time desc';
    db.query(sql, student_id, (err, results) => {
        if (err) {
            return res.cc(err.message);
        } else if (results.length < 0) {
            return res.cc('查询失败', 400);
        } else {
            for (let i = 0; i < results.length; i++) {
                results[i].details_time = tools.formatDate(results[i].work_time, 'YYYY-MM-DD hh:mm:ss');
                results[i].work_time = tools.formatDate(results[i].work_time, 'YYYY-MM-DD');
                results[i].end_time = tools.formatDate(results[i].end_time, 'YYYY-MM-DD');
            }
            return res.send({
                status: 200,
                message: '查询成功',
                data: results
            })
        }
    })
}
exports.getDetailsHW = async (req, res) => {
    const work_id = req.query.work_id;
    const sql = 'select t1.work_id,t1.work_name,t1.work_details,t1.end_time,t2.work_pic,t2.work_content,t2.work_status from homework t1 left join workinfo t2 on t1.work_id = t2.work_id where t1.work_id = ?';
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
        work_status: 1,
        work_content,
    }
    const sql = 'insert into workinfo set ?'
    const sql1 = 'update homework set finish_num = (select count(*) from workinfo where work_status = 1 and work_id = ?) where work_id = ?'
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
    const sql2 = 'select t1.score,t2.course_name from score t1 left join course t2 on t1.course_id = t2.course_id where t1.student_id = ?';
    db.query(sql2, student_id, (err, results) => {
        if (err) {
            return res.cc(err.message);
        } else if (results.length < 0) {
            return res.cc('查询失败', 400);
        } else {
            return res.send({
                status: 200,
                message: '查询成功',
                data: results,
            })
        }
    })

}

exports.addActivity = (req,res) =>{
    const Info = {
        name:req.body.name,
        userid:req.query.id,
        actime:req.body.actime,
    }
    const sql = 'insert into activity set ?';
    db.query(sql,Info,(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.affectedRows!==1){
            return res.cc('新增失败',400);
        } else {
            return res.cc('新增成功',200);
        }
    })
}
exports.getActivity = (req,res) =>{
    const userid = req.query.id;
    const sql = 'select * from activity where userid = ?';
    db.query(sql,userid,(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.length === 0){
            return res.cc('查询失败',400);
        } else {
            results = JSON.parse(JSON.stringify(results));
            results.forEach(i => {
                i.actime = tools.formatDate(i.actime,'YYYY-MM-DD');
            });
            return res.send({
                status:200,
                message:'查询成功',
                data:results,
            })
        }
    })
}