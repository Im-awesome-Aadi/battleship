const Server = require('./service/server')
const model = require('./model/lobby')
const homeRoute = require('./route/home-page')
const cookieRoute = require('./route/cookie')
require('./utils/db')


Server.app.use('/',homeRoute);
Server.app.use('/cookie',cookieRoute);



Server.app.get('/api', async(req,res)=>{

    const newLobby = new model({
        lobbyId : 'ABSDEF',
        hostName : 'Aditya',
        players : ['Aditya']
    });
    const result = await newLobby.save()
    res.send(result);
});
Server.app.get('/fetch',function(req,res){
    model.find()
    .then(result=>{
        result.forEach((index)=>{
            console.log(index);
            if(index.lobbyId === "ABSDEF"){
                return res.send(index);
            }
        });
        return res.json('false')
    })
});

Server.app.get('/update', async (req,res)=>{
    
    const result = await model.find();

    var updated="";
    result.forEach((index)=>{
        console.log(index);
        if(index.lobbyId === "ABSDEF"){
            updated = index;
            
    }
});

    updated.players.push("Saloni");
    updated.save();
     res.send(updated);
    console.log("happy")
           

});
Server.app.get('/delete', async (req,res)=>{
    
    const result = await model.find();

    var updated="";
    result.forEach((index)=>{
        console.log(index);
        if(index.lobbyId === "QWERTY"){
            updated = index;
            
    }
});

    updated.remove();
    res.send('deleted');
           

});
Server.app.get('/deleteall', async (req,res)=>{
    
    const result = await model.find();

    
    result.forEach((index)=>{
     index.remove();       
    });
    res.send('deleted all')

});
Server.server.listen(8080);