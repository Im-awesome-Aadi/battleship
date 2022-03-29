require('dotenv').config();
require('./service/db-config');
const Server = require('./service/server')
const homeRoute = require('./route/home-page')
const cookieRoute = require('./route/cookie')
const errorRoute = require('./route/error')
const playRoute = require('./route/play-game')
const port = process.env.PORT || 80;
const cluster = require('cluster')
const os = require('os')
const numCpu = os.cpus().length;
Server.app.use('/',homeRoute);
Server.app.use('/play',playRoute);
Server.app.use('/cookie',cookieRoute);
Server.app.use('/error', errorRoute);
Server.app.use('*', errorRoute);


if(cluster.isMaster){
    for(let cpu = 0;cpu< 8;cpu++){
            cluster.fork();
    }
}else{
    Server.server.listen(port,()=>{
        console.log(`Server running on port ${port}`);
    });
}
