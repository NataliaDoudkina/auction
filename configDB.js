const sql=require('mssql')
 
    const config={   user: 'sa',
        password: '12345',
        server: "localhost", 
        database: 'AuctionDB', 
        port:1433
}
    const connection=async(conn)=>{
      await  conn.connect(err=>{
            if (err){
              console.log(err)
              return;
            }  
          let  connection=conn;
            console.log("You are connected to DB!")
              })
     } 

let conn=new sql.ConnectionPool(config);

connection(conn)

const getRequest=()=>{
       return new sql.Request(conn);
}

 module.exports={
     config,
connection,
getRequest
 }

    
    


