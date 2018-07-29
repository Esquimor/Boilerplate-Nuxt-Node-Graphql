var express = require('express');
var router = express.Router();

var controllers = require('./../controllers/users');

/* GET users listing. */
router.get('/', controllers.index);

module.exports = router;
