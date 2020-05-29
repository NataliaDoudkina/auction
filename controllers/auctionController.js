const uuidv4 = require('uuid/v4');
const configuration=require('../configDB')

let request=configuration.getRequest();

let  sqlGetItemsQuery=`SELECT * FROM item`;

const getItems=(req,res)=>{   
     
    getItemsToDisplay().then(result=>{
                res.render('auction', {items:result,mistakes:[], message:`Hello, ${req.session.userId}`})
    }).catch(err=>{
        console.log(err)
    })        
  }


const getItemsToDisplay=async()=>{
    let items=[]
    let result= await request.       
    query(sqlGetItemsQuery);    
    for(let i=0;i<result.rowsAffected;i++){
       items.push(result.recordset[i])
}
    return items
}


const currentBid= async(bid)=>{
    let current;
    let sqlQueryGetBid=`SELECT item_current_bid from item where item_id=${bid}`;
    let result =  await  request.    
   query (sqlQueryGetBid);
   for(let i=0;i<result.rowsAffected;i++){
    current=result.recordset[i].item_current_bid          
  } 
        return current
  } 

const getBid=(req,res)=>{
const {itemId}=req.body
let bid=req.body.bid
let errors=[]
let current;
let id=uuidv4();
 bid=parseInt(Math.round(bid))
currentBid(itemId)
.then(result=>{
    current=result   
    errors=bidValidation(bid,current)
    if(errors.length>0){
        getItemsToDisplay().then(result=>{
            res.render( 'auction', {  items:result,mistakes:errors, message:`Hello, ${req.session.userId}`}, )    
        })
               
       }else{
          
           let sqlQueryUpdateUserItem=`INSERT INTO userItem (id,username, item_id,bid) VALUES ('${id}','${req.session.userId}','${itemId}', '${bid}')  `
           let sqlQueryUpdateRecord=`UPDATE item SET item_current_bid = ${bid} WHERE item_id=${itemId}`
                request.query(sqlQueryUpdateUserItem,(err)=>{
               if(err){
                   console.log(err)
               }
           })
           request.query(sqlQueryUpdateRecord,(err)=>{
if(err){
    console.log(err)
}else{
    console.log("Row was updated")
    getItemsToDisplay().then(result=>{
        res.render( 'auction', {  items:result,mistakes:[], message:`Your username is ${req.session.userId}`} )    
    })
}
           });       
    }
})
}

//validate bid
const bidValidation=(bid, nextBid)=>{  
    let errors=[]
    bid=parseInt(bid)
    nextBid=parseInt(nextBid)
    if(Number.isNaN(bid)){
        errors.push('Bid has to be numeric value')
    }
    if((bid-nextBid)<5){
        errors.push('Minimum increment is 5')
    }
    if(bid===nextBid){
        errors.push('Bid has to be higher than current one')
    }
    if(bid<nextBid){
        errors.push("Bid has to be higher than current one")
    }
   return errors    
}


module.exports={
    getItems,
    getBid,
  }


