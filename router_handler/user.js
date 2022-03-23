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
        identity:req.body.identity
    };
    console.log(userInfo);
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