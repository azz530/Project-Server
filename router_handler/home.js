const { now } = require('moment');
const db = require('../db/index.js');
const tools = require('../utils/tools.js');

exports.getNotice = (req,res) =>{
    const Leftsql = "select * from notice order by time desc limit 0,6";
    const Rightsql = "select * from notice order by time desc limit 6,6";
    db.query(Leftsql,(err,leftResults)=>{
        if(err){
            return res.cc(err.leftResults);
        } else if(leftResults.length<0){
            return res.cc('查询失败',400);
        } else {
            leftResults = JSON.parse(JSON.stringify(leftResults));
            leftResults.forEach(item => {
                item.time = tools.formatDate(item.time, 'MM-DD');
            });
            db.query(Rightsql,(err1,rightResults)=>{
                if(err1){
                    return res.cc(err1.message);
                } else if(rightResults.length<0){
                    return res.cc('查询失败',400);
                } else {
                    rightResults = JSON.parse(JSON.stringify(rightResults));
                    rightResults.forEach(item => {
                        item.time = tools.formatDate(item.time, 'MM-DD');
                    });
                    return res.send({
                        status:200,
                        message:'查询成功',
                        leftData:leftResults,
                        rightData:rightResults,
                    })
                }
            })
        }
    })
}
exports.getNoticeById = (req,res) =>{
    const id = parseInt(req.query.id);
    const sql = 'select * from notice where id = ?';
    db.query(sql,id,(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.length!==1){
            return res.cc('查询失败',400);
        } else {
            results = JSON.parse(JSON.stringify(results));
            results[0].time = tools.formatDate(results[0].time, 'YYYY-MM-DD hh:mm:ss');
            return res.send({
                status:200,
                message:'查询成功',
                data:results[0],
            })
        }
    })
}
exports.getOtherNotice = (req,res) =>{
    const id = parseInt(req.query.id);
    const sql = 'select * from notice where id != ? order by time desc limit 0,6';
    db.query(sql,id,(err,results)=>{
        if(err){
            return res.cc(err.message);
        } else if(results.length<0){
            return res.cc('查询失败',400);
        } else {
            results = JSON.parse(JSON.stringify(results));
            results.forEach(index => {
                index.time = tools.formatDate(index.time, 'YYYY年MM月DD日');
            });
            return res.send({
                status:200,
                message:'查询成功',
                data:results,
            })
        }
    })
}