const express = require('express')
const homeController = require('../controller/show-home');
const cookieController = require('../controller/cookie');
const hostController = require('../controller/host-game');
const lobbyController = require('../controller//lobby-page');
const router = express.Router();

router.get('/',homeController.getHomePage);
router.get('/lobby/:lobbyId',cookieController.checkCookie,lobbyController.getLobbyPage);
router.get('/host-game',cookieController.checkCookie,hostController.getHostPage);

module.exports = router;