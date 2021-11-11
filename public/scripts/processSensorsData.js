// To ignore, not in use.

import { aqiFromPM } from "./AQIcalculator.js";
import { getSensorIDs } from "./listOfSensorsIDs.js";
import { getRawSensorsData } from "./loadSensorsData.js";

// Process raw data from server. Here we can decide what entries from the sensors matters
function processSensorsData(jsonFromServer)
{
    const sensorIDs = getSensorIDs();
    const sensorsData = [];

    if(jsonFromServer.code)
    {
        if(jsonFromServer.code !== 200)
        {
            throw new Error(jsonFromServer.message);
        }
    }

    // Process each sensor data
    sensorIDs.forEach((sensorID) => {
        const results = jsonFromServer.find(read => read.ID === sensorID)
        if(results !== undefined)
        {
            let stats = JSON.parse(results['Stats'])
            let calculatedAQI = aqiFromPM(parseFloat(stats['v5']))
            sensorsData.push({
                ID: sensorID,
                pm2_5_current: parseFloat(results['pm2_5_atm']),
                pm2_5_24h_average: stats['v5'],
                Label: results['Label'],
                Latitude: results['Lat'],
                Longitude: results['Lon'],
                AQI: calculatedAQI
    
            })
        }
        else
        {
            console.log('could not find sensor data for ID', sensorID)
        }
    })

    return sensorsData;

}

export async function getProcessedSensorData()
{
    const rawSensorsData = await getRawSensorsData();
    console.log(rawSensorsData);
    return processSensorsData(rawSensorsData);
}