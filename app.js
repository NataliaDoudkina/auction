const express=require("express")
const app=express();
const port=3000
const path = require('path');
const bodyParser=require('body-parser')
const cookieSession=require('cookie-session')
const sql=require('mssql')


//middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieSession({
    keys:['jsh2fow5f6h3kfdjip9asd']
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/stylesheets/', express.static('./public/stylesheets'));
//app.use('/public/images/', express.static('./public/images'));

//routers
const indexRouter = require('./routes/index');
const auctionRouter =require('./routes/auction')
const adminRouter=require('./routes/admin')
app.use('/', indexRouter);
app.use('/auction', auctionRouter);
app.use('/admin', adminRouter)


app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})

module.exports=app



