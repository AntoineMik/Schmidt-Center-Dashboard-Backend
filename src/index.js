var express = require('express');
var router = express.Router();

var sensors_controller = require('../handlers/listOfSensorsIDs')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const data = await sensors_controller.listSensors();
  res.render('index', { title: 'API HOW TO', data: data});
});

module.exports = router;
