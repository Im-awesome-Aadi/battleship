require('dotenv').config();
require('./service/db-config');
const Server = require('./service/server')
const model = require('./model/lobby')
const homeRoute = require('./route/home-page')
const cookieRoute = require('./route/cookie')
const errorRoute = require('./route/error')
const port = process.env.PORT || 3000;

Server.app.use('/',homeRoute);
Server.app.use('/cookie',cookieRoute);
Server.app.use('/error', errorRoute);
Server.app.get('/deleteall', async (req,res)=>{
    
    const result = await model.find();

    
    result.forEach((index)=>{
     index.remove();       
    });
    res.send('deleted all')

});
Server.app.use('*', errorRoute);

Server.server.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});