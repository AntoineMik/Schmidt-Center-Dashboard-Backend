/* Load sensors data from the server and process it.
 */

import { aqiFromPM, getAQIDescription, getAQIMessage } from "./AQIcalculator.js";
import { getSensorIDs } from "./listOfSensorsIDs.js";

const sensorsData = [];
var rawdata = {};

// Process raw data from server. Here we can decide what entries from the sensors matters
function processSensorsData(jsonFromServer)
{
    const sensorIDs = getSensorIDs();

    // Save raw data for when needed
    rawdata = JSON.parse(JSON.stringify(jsonFromServer));

    // Check for proper response fron the API call
    if(jsonFromServer.code)
    {
        if(jsonFromServer.code !== 200)
        {
            throw new Error(jsonFromServer.message);
        }
    }

    // Process each sensor data to include relevant information
    // Primary and secondary ID and Channel ID are for accessing data throught the thingspeak api.
    sensorIDs.forEach((sensorID) => {
        const results = jsonFromServer.results.find(read => read.ID === sensorID)
        if(results !== undefined)
        {
            let stats = JSON.parse(results['Stats'])
            let calculatedAQI = aqiFromPM(parseFloat(stats['v5']))
            sensorsData.push({
                ID: sensorID,
                THINGSPEAK_PRIMARY_Channel_ID : results['THINGSPEAK_PRIMARY_ID'],
                THINGSPEAK_PRIMARY_API_KEY : results['THINGSPEAK_PRIMARY_ID_READ_KEY'],
                THINGSPEAK_SECONDARY_Channel_ID : results['THINGSPEAK_SECONDARY_ID'],
                THINGSPEAK_SECONDARY_API_KEY : results['THINGSPEAK_SECONDARY_ID_READ_KEY'],
                pm2_5_current: parseFloat(results['pm2_5_atm']),
                pm2_5_24h_average: stats['v5'],
                Label: results['Label'],
                Latitude: results['Lat'],
                Longitude: results['Lon'],
                AQI: calculatedAQI,
                AQIDescription: getAQIDescription(calculatedAQI),
                AQIMessage: getAQIMessage(calculatedAQI) 
    
            })
        }
        else
        {
            console.log('could not find sensor data for ID', sensorID)
        }
    })

}


// Load the raw data from the server
async function loadData()
{
    fetch('/api', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    
    })
      .then((fromServer) => fromServer.json())
      .then((jsonFromServer) => {
          console.log(jsonFromServer);
          processSensorsData(jsonFromServer);
        })
      .catch((err) => {
        console.log(err);
    });
}

await loadData();

export function getRawSensorsData()
{
    return rawdata;
}

export function getProcessedSensorData()
{
  console.log(sensorsData);
  return sensorsData;
}