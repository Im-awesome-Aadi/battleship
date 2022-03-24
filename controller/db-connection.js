let dbConnection = require('../service/db-config');

exports.isDbConnected= async(req,res,next)=>{
    let dbStatus = dbConnection.connection.readyState;
    if(dbStatus!=1){
        console.log('Server not connected to db');
        return res.redirect('/error/404');
    }
    next();
}
