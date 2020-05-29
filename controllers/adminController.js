const sql=require('mssql')
const configuration=require('../configDB')


let request=configuration.getRequest();

const getHomePage=(req,res)=>{
    console.log(req.session.userId)
    if(req.session.userId!==undefined){
             res.render('admin', {message:'You have to log out first, go to /signout' })

    }else{        
res.render('admin',{message:''});
    }
    
}

const displayUsers=(req,res)=>{
    if(req.session.userId===undefined){
let username=req.body.username;
const getUserBids=`SELECT * from userItem WHERE username='${username}'`;
    request.query(getUserBids,(err,result)=>{
        if(err){
console.log(err)
        }else{          
            res.send({user:result.recordset})
        }

    })
    }
else{
    res.render('admin', {message:'You have to log out first, go to /signout' })
}
}

module.exports={
    displayUsers,
    getHomePage
}