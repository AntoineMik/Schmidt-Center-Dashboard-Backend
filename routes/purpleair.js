var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

// import sensor list from file
var sensors = require('../handlers/listOfSensorsIDs')


// Lists of sensors IDs
const sensorIDs = sensors.getSensorsIDs();

// Format the sensor list to match purple air call for multiple entries.
// More info here: https://docs.google.com/document/d/15ijz94dXJ-YAZLi9iZ_RaBwrZ4KtYeCy08goGBwnbCU/edit
const formattedSensorIds = sensorIDs.reduce(
    (finalString, currentValue, index, source) => {
      return index < source.length
        ? finalString + '|' + currentValue.toString()
        : finalString + currentValue;
    }
);

/* GET home page. */
router.get('/', async function(req, res) {
    console.log('GET request detected for purple air sensors Data');

    const data = await fetch(
      `https://www.purpleair.com/json?show=${formattedSensorIds}`
    );
    // Parse as Json
    const json = await data.json();
    console.log('data from fetch Succeded:', json);
    res.status(200).json(json);
});

module.exports = router;