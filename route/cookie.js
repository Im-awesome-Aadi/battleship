const express = require('express')
const cookieController = require('../controller/cookie');
const router = express.Router();

router.post('/set',cookieController.setCookie);
router.get('/get',cookieController.getCookie);


module.exports = router;