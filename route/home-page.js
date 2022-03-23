const express = require('express')
const homeController = require('../controller/show-home');
const cookieController = require('../controller/cookie');
const hostController = require('../controller/host-game');
const lobbyController = require('../controller/lobby-page');
const dbController = require('../controller/db-connection')
const router = express.Router();

router.get('/',homeController.getHomePage);
router.get('/lobby/:lobbyId',dbController.isDbConnected,cookieController.checkCookie,lobbyController.getLobbyPage);
router.get('/host-game',dbController.isDbConnected,cookieController.checkCookie,hostController.getHostPage);

module.exports = router;