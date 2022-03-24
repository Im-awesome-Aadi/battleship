const express = require('express')
const errorController = require('../controller/error-handler');
const router = express.Router();

router.get('/404',errorController.pageNotFound);
router.get('/*',errorController.pageNotFound);

module.exports = router;