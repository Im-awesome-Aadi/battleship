const express = require('express')

const cookieController = require('../controller/cookie');
const playController= require('../controller/play-game');
const dbController = require('../controller/db-connection')
const router = express.Router();


router.get('/lobby/:lobbyId',dbController.isDbConnected,cookieController.checkCookie,playController.getLobbyPage);
router.get('/computer',cookieController.checkCookie,playController.getComputerPage);

module.exports = router;