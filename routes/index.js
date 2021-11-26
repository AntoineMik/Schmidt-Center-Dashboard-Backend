var express = require('express');
var router = express.Router();

// Require controller modules.
//var apiController = require('../handler/apiController');
var sensors_controller = require('../handlers/listOfSensorsIDs')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const data = await sensors_controller.listSensors();
  res.render('index', { title: 'API HOW TO', data: data});
});

// GET API home page.
//router.get('/', apiController.index);



module.exports = router;
