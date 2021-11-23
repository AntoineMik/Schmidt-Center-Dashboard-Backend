var express = require('express');
var router = express.Router();

// Require controller modules.
//var list_sensors = require('../handlers/listOfSensorsIDs');
//var purpleair_data = require('../handlers/purpleairDataHandler');
var sensors_controller = require('../handlers/listOfSensorsIDs')

// GET catalog home page.
router.get('/sensors', sensors_controller.listSensors);


// Home page route.
router.get('/', async function (req, res) {
    const data = await sensors_controller.listSensors();
    //res.render('sensor_list', { title: 'Sensors List', sensors_list: data });
    res.status(200).json(data);
    console.log(data);
})

// About page route.
router.get('/list', function (req, res) {
  res.status(200).json(data);
})

module.exports = router;