
const Conf = require('./utils/conf')
const model = require('./model/lobby')
const homeRoute = require('./route/home-page')
const cookieRoute = require('./route/cookie')
require('./utils/db')

Conf.app.use(Conf.cookieParser());
Conf.app.use(Conf.bodyParser.json());
Conf.app.use(Conf.Express.static(__dirname + '/public'));
Conf.app.set('view engine','ejs');


Conf.app.use('/',homeRoute);
Conf.app.use('/cookie',cookieRoute);

Conf.app.post('/join-room',function(req,res){

   console.log('called')

 
});


Conf.app.get('/api', async(req,res)=>{

    const newLobby = new model({
        lobbyId : 'ABSDEF',
        hostName : 'Aditya',
        players : ['Aditya']
    });
    const result = await newLobby.save()
    res.send(result);
});
Conf.app.get('/fetch',function(req,res){
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

Conf.app.get('/update', async (req,res)=>{
    
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
Conf.server.listen(8080);