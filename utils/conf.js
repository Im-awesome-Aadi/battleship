
const Express = require('express');
const app = Express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

module.exports = {
    Express,app,server,io,cookieParser,bodyParser
}
