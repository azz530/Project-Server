const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./router/user.js');
const userinfoRouter = require('./router/userinfo.js');
const teacherRouter = require('./router/teacher.js');
const adminRouter = require('./router/admin.js');
const config = require('./config.js');
const expressJWT = require('express-jwt');
const port = 3000;
app.use(express.static('uploads'));
// app.all("*",(req,res,next)=>{
//     res.header('Access-Control-Allow-Origin',"*");
//     res.header('Access-Control-Allow-Headers','Content-Type,Authorization');
//     res.header('Access-Control-Allow-Methods','DELETE,PUT,POST,GET,OPTIONS');
//     if(req.method === 'OPTIONS'){
//         res.sendStatus(200);
//     } else {
//         next();
//     }
// })
app.use(cors());//配置cors跨域
app.use(express.urlencoded({extended:false}));//配置解析表单数据的中间件
app.use(express.json());

//封装res.cc函数作为中间件,作用相应状态信息
app.use((req,res,next)=>{
    res.cc=function(err,status = 1){
        res.send({
            status,
            message:err instanceof Error ?err.message:err,
        })
    }
    next();
});
//解析token的中间件
app.use(expressJWT({secret: config.jwtSecretKey,algorithms:['HS256']}).unless({path:[/^\/api/,/^\/teacher/,/^\/admin/]}));
app.use('/api',userRouter);
app.use('/my',userinfoRouter);
app.use('/teacher',teacherRouter);
app.use('/admin',adminRouter);
//错误中间件
app.use((err,req,res,next)=>{
    if(err.name === 'UnauthorizedError'){
        return res.cc('身份认证失败',401);
    }
})


app.listen(port,()=>{
    console.log(`Server running at http://127.0.0.1:${port}`);
})