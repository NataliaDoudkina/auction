const configuration=require('../configDB')
const uuidv4 = require('uuid/v4');


const getHomePage=(req,res)=>{
    res.render('index',{message:'',mistakes:[]});
}

const register=(req,res)=>{
    let errors= checkInput(req.body.username);
    if(errors.length===0){
        signUp(req,res)
    } 
else{
    res.render('index', {mistakes:errors,message:''})
}
}

let request=configuration.getRequest();

const signUp=(req,res)=>{
   let username=req.body.username
   let id=uuidv4()
    let sqlQuerySelect= `SELECT * from [user] where username='${username}' `
    let sqlQueryInsert = `INSERT INTO [user] (username) VALUES ('${username}')`;
    let sqlQueryInsertIntoUserItem=`INSERT INTO userItem (item_id,username)  VALUES ('${id}','${username}')`
      try{
  request.query(sqlQuerySelect,(err,result)=>{
                  if(err){
                console.log(err)
                            }
                            else{                                         if(result.recordset.length===0){  
                                req.session.userId=username 
                                request.query(sqlQueryInsertIntoUserItem,(err)=>{
                                    if (err){
                                        console.log(err)
                                    }
                                });
                                                   request.query(sqlQueryInsert, (err)=>{
                                       if(err){
                                           console.log(err)
                                       }
                                       else
                                      
     res.render('index', {message:`Hello, ${req.session.userId}`, mistakes:[]});                                                          
                                   })                            
                                }
                                else{
                                    req.session.userId=username 
                                    res.redirect('/auction')}}                  
                            }) 
 }
    catch(err){
        if(err) console.log(err)
    }
}

const checkInput=(username)=>{
const issues=[];
if(username.length===0){
    issues.push("Username cannot be empty")
}
return issues
}

const signOut=(req,res)=>{
    req.session=null;
    res.render('index', {mistakes:[], message:'You are signed out!'})
    }

module.exports={
        register,
        getHomePage,
        signOut
   }