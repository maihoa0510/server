const koa = require('koa')
const fs = require("fs");
const json =require('koa-json')
const koaRouter = require('koa-router')
const bodyparser = require('koa-bodyparser')
const app = new koa()
const router = new koaRouter()
app.use(json())
app.use(bodyparser())

// app.use((_req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
  
//     next();
//   });

// 
router.get('/getuser', getuser )

async function getuser(ctx) {
    const user_db = fs.readFileSync("user.json","utf8");
    let array = JSON.parse(user_db);
    ctx.body = array;
    ctx.status = 201;
    // console.log(array);
}

router.post('/adduser', adduser )

async function adduser(ctx) {
    const user_db = fs.readFileSync("user.json","utf8");
    let array = JSON.parse(user_db);
    array.push(ctx.request.body);
    console.log(array);
    fs.writeFileSync('user.json', JSON.stringify(array)) ;
    ctx.body =array;
    ctx.status = 201;
}


app.use(router.routes()).use(router.allowedMethods())
app.listen(5000, () =>{
    console.log("app is start");
})