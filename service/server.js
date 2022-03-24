const Express = require('express');
const app = Express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(Express.static(path.join(__dirname,'../', 'public')));
app.set('view engine','ejs');

module.exports = {
    app,server,io
}