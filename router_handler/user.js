//用户模块的路由处理函数
const db = require('../db/index.js');
const bcryptjs = require('bcryptjs');//密码加密
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const { expiresIn } = require('../config.js');

//用户注册的处理函数
exports.reguser = (req,res)=>{
    const userInfo = {
        username:req.body.username,
        password:req.body.password,
        avatar:req.body.avatar,
        identity:req.body.identity,
        identity_id:req.body.identity_id,
    };
    if(!userInfo.username || !userInfo.password){
        return res.send({
            status:400,
            message:'用户名或密码不合法'
        })
    }
    const sqlStr = 'select username from users where username=?';//查询数据库的用户名重名
    const sqlReg = 'insert into users set ?';//
    db.query(sqlStr,userInfo.username,(err,results)=>{
        if(err){
            return res.cc(err);
        } else if(results.length>0){
            return res.cc('用户名已被注册,请更换',400);
        } else{//TODO
            userInfo.password = bcryptjs.hashSync(userInfo.password,10); 
            db.query(sqlReg,userInfo,(err,results)=>{
                if(err){ //判断数据库操作是否成功
                    return res.cc(err);
                } else if(results.affectedRows !=1 ){//判断数据库当中影响行数是否为1
                    return res.cc('注册失败',400);
                } else{
                    return res.cc('注册成功',200);
                }
            })
        }
    })
}
//处理用户登录的处理函数
exports.login = (req,res)=>{
    const userInfo = req.body;
    const sqlLogin = ` select * from users where username = ? and identity = ?`;
    db.query(sqlLogin,[userInfo.username,userInfo.identity],(err,results)=>{
        if(err){
            return res.cc(err);
        } else if(results.length !== 1){
            return res.cc('登录失败',401);
        } else{
            const rightPw = bcryptjs.compareSync(userInfo.password,results[0].password);
            if(!rightPw){
                return res.cc('密码错误',401);
            } else{
                const user = {...results[0],password: ''};
                //对用户信息进行加密生成token
                const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn: config.expiresIn});
                res.send({
                    status:200,
                    message:'登录成功',
                    token: 'Bearer ' + tokenStr
                });
            }
        }
    })
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
exports.checkPsw = async(req,res) =>{
    const id = req.query.id;
    const password = req.query.oldPassword;
    const sql  = 'select password from users where id =? ';
    db.query(sql,id,(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.length <= 0){
            return res.cc('查询失败',400);
        } else {
            results = JSON.parse(JSON.stringify(results));
            const check = bcryptjs.compareSync(password,results[0].password);
            if(!check){
                return res.cc('密码错误',401);
            } else {
                return res.cc('密码正确',200);
            }
        }
    })
}
exports.checkUser = async(req,res) =>{
    const username = req.query.username;
    const sql = 'select * from users where username = ?';
    db.query(sql,username,(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.length<=0){
            return res.cc('未查询到该用户',400);
        } else {
            return res.send({
                status:200,
                message:'该用户存在',
            });
        }
    })
}
exports.changePsw = async(req,res)=>{
    const password = req.body.newPassword;
    const id = parseInt(req.query.id);
    const sql = 'update users set password = ? where id = ?';
    const newpassword = bcryptjs.hashSync(password,10);
    db.query(sql,[newpassword,id],(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.affectedRows !== 1){
            return res.cc('修改失败',400);
        } else {
            return res.cc('修改成功',200);
        }
    })
}
exports.forgetPsw = async(req,res)=>{
    const identity = req.body.identity;
    const username = req.body.username;
    const password = req.body.password;
    const newPassword = bcryptjs.hashSync(password,10);
    const sql = 'select * from users where username = ? and identity =? and identity_id =?';
    const sql1 = 'select * from users where username = ? and identity =?';
    const sql3 = 'update users set password =? where username =?';
    if(identity === '学生' || identity === '老师'){
        const identity_id = parseInt(req.body.identity_id);
        db.query(sql,[username,identity,identity_id],(err1,result1)=>{
            if(err1){
                return res.cc(err1.message);
            } else if(result1.length<=0){
                return res.cc('身份信息失败',402);
            } else {
                db.query(sql3,[newPassword,username],(err2,result2)=>{
                    if(err2){
                        return res.cc(err2.message);
                    } else if(result2.affectedRows !== 1){
                        return res.cc('修改密码失败',400);
                    } else {
                        return res.cc('修改密码成功',200);
                    }
                })
            }
        })
    } else {
        db.query(sql1,[username,identity],(err1,result1)=>{
            if(err1){
                return res.cc(err1.message);
            } else if(result1.length<=0){
                return res.cc('身份信息失败',402);
            } else {
                db.query(sql3,[newPassword,username],(err2,result2)=>{
                    if(err2){
                        return res.cc(err2.message);
                    } else if(result2.affectedRows !==1 ){
                        return res.cc('修改密码失败',400);
                    } else {
                        return res.cc('修改密码成功',200);
                    }
                })
            }
        })
    }
}