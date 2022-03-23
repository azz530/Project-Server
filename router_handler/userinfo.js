const db = require('../db/index.js');
const tools = require('../utils/tools.js'); 
exports.getUserInfo = (req,res)=>{
    const sqlGetUerInfo = 'select username,avatar,identity,usersign,tags,birthday,address from users where id=?' ;
    const id = req.query.id
    db.query(sqlGetUerInfo,id,(err,results)=>{//查询用户信息
        if(err){
            return res.cc(err);
        } else if(results.length !==1 ){
            return res.cc('获取用户信息失败');
        } else {
            results[0].birthday = tools.formatDate(results[0].birthday,'YYYY-MM-DD');
            res.send({
                meta:{
                    status:200,
                    message:'查询成功'
                },
                data: results[0],
            })
        }
    });
}
exports.addTags = async (req,res) =>{
    const id = req.query.id;
    const tag = req.body.tags;
    const upsql = "update users set tags = concat(tags,',',?) where id=?";
    const sql = 'select tags from users where id=?';
    const Sql = 'update users set tags = ? where id=?';
    db.query(sql,id,(error,result)=>{
        if(error){
            return res.cc(error.message);
        }else if(result[0].tags === '' || result[0].tags === null) {
            db.query(Sql,[tag,id], (err,results)=>{
                if(err) {
                    return res.cc(err.message);
                } else if(results.affectedRows !== 1){
                    return res.cc('新增标签失败',400);
                } else {
                    return res.cc('新增标签成功',200);
                }
            })
        } else {
            let str = result[0].tags.split(',');
            for(let i=0;i<str.length;i++){
                if(str[i] === tag){
                    return res.cc('标签已存在',402);
                }
            }
            db.query(upsql,[tag,id], (erro,resolve)=>{
                if(erro) {
                    return res.cc(erro.message);
                } else if(resolve.affectedRows !== 1){
                    return res.cc('新增标签失败',400);
                } else {
                    return res.cc('新增标签成功',200);
                }
            });
        }
    })
}
exports.delTags = async(req,res)=>{
    let tagList = req.body;
    const id = req.query.id;
    let tag = tagList.join(',');
    const sql = 'update users set tags = ? where id = ?';
    db.query(sql,[tag,id], (err,results)=>{
        if(err) {
            return res.cc(err.message);
        } else if(results.affectedRows !== 1){
            return res.cc('删除标签失败',400);
        } else {
            return res.cc('删除标签成功',200);
        }
    })
}