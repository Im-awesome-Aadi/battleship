const Server = require('./service/server')
const model = require('./model/lobby')
const homeRoute = require('./route/home-page')
const cookieRoute = require('./route/cookie')
const port = process.env.PORT || 3000;
require('./service/dbConfig')


Server.app.use('/',homeRoute);
Server.app.use('/cookie',cookieRoute);
Server.app.use('/error',function(req,res){
    res.render('error');
})
Server.app.get('/deleteall', async (req,res)=>{
    
    const result = await model.find();

    
    result.forEach((index)=>{
     index.remove();       
    });
    res.send('deleted all')

});
Server.server.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});