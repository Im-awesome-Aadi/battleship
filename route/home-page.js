const express = require('express')
const homeController = require('../controller/show-home');
const cookieController = require('../controller/cookie');
const hostController = require('../controller/host-game');
const router = express.Router();
const Conf = require('../utils/conf');
const playerModel = require('../model/player');
router.get('/',homeController.getHomePage);
router.get('/lobby/:lobbyId',cookieController.checkCookie,homeController.getLobbyPage);
router.get('/host-game',cookieController.checkCookie,hostController.getHostPage);

module.exports = router;