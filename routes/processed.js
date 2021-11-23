var express = require('express');
var router = express.Router();

var purpleairHandler = require('../handlers/purpleairDataHandler')

/* GET processed data for all sensors and PG areas. */
router.get('/', async function(req, res, next) {
  var data = await purpleairHandler.getUpdatedSensorsData();
  res.status(200).json(data);
});

/* GET processed data for all schmidt sensors. */
router.get('/schmidt', async function(req, res, next) {
  var data = await purpleairHandler.getUpdatedschmidtSensorsData();
  res.status(200).json(data);
});

/* GET processed data for North County Sensors. */
router.get('/north', async function(req, res, next) {
  var data = await purpleairHandler.getUpdatedNorthCountySensorsData();
  res.status(200).json(data);
});

/* GET processed data for Central County Sensors. */
router.get('/central', async function(req, res, next) {
  var data = await purpleairHandler.getUpdatedCentralCountySensorsData();
  res.status(200).json(data);
});

/* GET processed data for Rural County Sensors. */
router.get('/rural', async function(req, res, next) {
  var data = await purpleairHandler.getUpdatedRuralTierSensorsData();
  res.status(200).json(data);
});

/* GET processed data for Inner County Sensors. */
router.get('/inner', async function(req, res, next) {
  var data = await purpleairHandler.getUpdatedInnerBeltwaySensorsData();
  res.status(200).json(data);
});

/* GET processed data for South County Sensors. */
router.get('/south', async function(req, res, next) {
  var data = await purpleairHandler.getUpdatedsouthCountySensorsData();
  res.status(200).json(data);
});

module.exports = router;