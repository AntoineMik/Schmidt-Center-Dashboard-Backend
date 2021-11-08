// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

/* Using fetch. Not cmpatible with internet explorer
More here: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch*/

async function getLatestSensorData(sensorIDs)
{

    // Format the sensor list to match purple air call for multiple entries.
    // More info here: https://docs.google.com/document/d/15ijz94dXJ-YAZLi9iZ_RaBwrZ4KtYeCy08goGBwnbCU/edit
    const formattedSensorIds = sensorIDs.reduce((finalString, currentValue, index, source) => {
        return index < source.length ? finalString + '|' + currentValue.toString() : finalString + currentValue
    });

    // Variable to store properly formated sensor data
    let sensorsData = [];

    // Hold fetch call
    let response =  await fetch(`https://www.purpleair.com/json?show=${formattedSensorIds}`);

    // Checks for valid response and trows error if fetch call failed
    if (!response.ok) {
        alert('Network response was not OK');
        return response.status()
    }
    else {
        // Parse response to JSON
        let sensorDataJSON = await response.json();

        return sensorDataJSON;

        /*sensorIDs.forEach(element => {
            const data = sensorDataJSON.results.find()
        });*/

    }
}

const testSensorIDs = [2221, 8244, 8248];

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api')
  .get(async (req, res) => {
    console.log('GET request detected');
    const data = await fetch('https://www.purpleair.com/json?show=<2221>');
    const json = await data.json();
    console.log('data from fetch', json);
    res.json(json);
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);

    const data = await fetch('https://www.purpleair.com/json?show=<2221>');
    const json = await data.json();
    console.log('data from fetch', json);
    res.json(json);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
