// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

// import sensor list from file
import { getSensorIDs } from "./public/scripts/listOfSensorsIDs.js";

/* Using fetch. Not cmpatible with internet explorer
More here: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch*/

const app = express();
const port = process.env.PORT || 3000;

// Lists of sensors IDs
const sensorIDs = getSensorIDs(); // [102898, 104786, 2221, 8244, 8248, 102830, 102890];
// Sensor: PGCPS_Schmidt_Orme ID 104786 currently offline

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Get and POST requests
app
  .route('/api')
  // GET requests
  .get(async (req, res) => {
    console.log('GET request detected for Sensor Data');

    // Format the sensor list to match purple air call for multiple entries.
    // More info here: https://docs.google.com/document/d/15ijz94dXJ-YAZLi9iZ_RaBwrZ4KtYeCy08goGBwnbCU/edit
    const formattedSensorIds = sensorIDs.reduce(
      (finalString, currentValue, index, source) => {
        return index < source.length
          ? finalString + '|' + currentValue.toString()
          : finalString + currentValue;
      }
    );
    const data = await fetch(
      `https://www.purpleair.com/json?show=${formattedSensorIds}`
    );
    // Parse as Json
    const json = await data.json();
    console.log('data from fetch Succeded:', json);
    res.json(json);
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);

    const data = await fetch('https://www.purpleair.com/json?show=2221');
    const json = await data.json();
    console.log('data from fetch', json);
    res.json(json);
  });

app.route('/weather').get(async (req, res) => {
  console.log('GET request detected for Weather');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
