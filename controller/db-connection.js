let dbConnection = require('../service/dbConfig');

exports.isDbConnected= async(req,res,next)=>{
    let dbStatus = dbConnection.connection.readyState;
    console.log(dbStatus)
    if(dbStatus!=1){
        console.log("Server not connected to db");
        return res.redirect('/error');
    }
    next();
}
