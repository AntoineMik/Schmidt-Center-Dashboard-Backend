var express = require('express');
var router = express.Router();

// Require controller modules.
//var list_sensors = require('../handlers/listOfSensorsIDs');
//var purpleair_data = require('../handlers/purpleairDataHandler');
var sensors_controller = require('../handlers/listOfSensorsIDs')

// GET catalog home page.
router.get('/sensors', sensors_controller.listSensors);


// List sensors route.
router.get('/', async function (req, res) {
    const data = await sensors_controller.listSensors();
    //res.render('sensor_list', { title: 'Sensors List', sensors_list: data });
    res.status(200).json(data);
    console.log(data);
});

// List north county sensors route.
router.get('/north', async function (req, res) {
  const data = await sensors_controller.getNorthCountySensorsIds();
  //res.render('sensor_list', { title: 'Sensors List', sensors_list: data });
  res.status(200).json(data);
  console.log(data);
});

// List Inner Beltway sensors route.
router.get('/inner', async function (req, res) {
  const data = await sensors_controller.getInnerBeltwaySensorsIds();
  //res.render('sensor_list', { title: 'Sensors List', sensors_list: data });
  res.status(200).json(data);
  console.log(data);
});

// List Central County sensors route.
router.get('/central', async function (req, res) {
  const data = await sensors_controller.getCentralCountySensorsIds();
  //res.render('sensor_list', { title: 'Sensors List', sensors_list: data });
  res.status(200).json(data);
  console.log(data);
});

// List Rural County sensors route.
router.get('/rural', async function (req, res) {
  const data = await sensors_controller.getRuralTierSensorsIds();
  //res.render('sensor_list', { title: 'Sensors List', sensors_list: data });
  res.status(200).json(data);
  console.log(data);
});

// List South County sensors route.
router.get('/south', async function (req, res) {
  const data = await sensors_controller.getSouthCountySensorsIds();
  //res.render('sensor_list', { title: 'Sensors List', sensors_list: data });
  res.status(200).json(data);
  console.log(data);
})

// Add sensor to sensors ids route.
router.get('/add', async function (req, res) {
  res.status(200).send("To add a sensor or sensors: format is /addsensor1_id,sensor2_id, ...");
})

// Add sensor by sensor ids route.
router.post('/add', async function (req, res) {

  var param = req.query;
  console.log(JSON.stringify(param));

  res.json({"Received": param})
  //const arr = param.split(',').map(item => parseInt(item));

  // if(sensor_IDs_isValid(arr)){
  //   await sensors_controller.addSensorByID(arr);
  //   res.status(200).json({"Successfuly added": arr});
  // }
  // else {
  //   res.status(500).send("Failed to add, wrong format. Proper format is /addsensor1_id,sensor2_id, ...");
  // }
})


function sensor_IDs_isValid(arr) {
  return Array.isArray(arr);
}

module.exports = router;