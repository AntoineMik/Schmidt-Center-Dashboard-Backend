import { aqiFromPM, getAQIDescription, getAQIMessage } from "./AQIcalculator.js";
import { getSensorIDs } from "./listOfSensorsIDs.js";

const rawData = async () => {
    return new Promise((resolve, reject) => {
        fetch('/api', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          })
            .then((fromServer) => fromServer.json())
            .then((jsonFromServer) => {
                console.log(jsonFromServer);
                if(jsonFromServer.code){
                    if(jsonFromServer.code !== 200){
                        throw new Error(jsonFromServer.message);
                    }
                }
                resolve({
                    error: false,
                    data: jsonFromServer
                })
              })
            .catch((err) => {
                reject({
                    error: true,
                    message: err.message,
                });
                console.log(err);
          });

    })
}

/* Process data for each sensors using the result
from the purpleair api call and the list of sensor ids.
The stats variable from the Json result holds all the 
sensors measurements */
const processedData = (inputData, sensor_IDs) => {

    //console.log("Inside processed data", inputData)
    const processedData = {};
    sensor_IDs.forEach(sensor_ID => {
        let results = inputData.results.find(read => read.ID === sensor_ID)
        //console.log("Checking results", results)
        if(results !== undefined) {
            let stats = JSON.parse(results['Stats']);
            let calculatedAQI = aqiFromPM(parseFloat(stats['v5']));

            processedData[sensor_ID] = {
                Primary_Channel_ID : results['THINGSPEAK_PRIMARY_ID'],
                Primary_KEY : results['THINGSPEAK_PRIMARY_ID_READ_KEY'],
                Secondary_Channel_ID : results['THINGSPEAK_SECONDARY_ID'],
                Secondary_KEY : results['THINGSPEAK_SECONDARY_ID_READ_KEY'],
                pm2_5_current: parseFloat(results['pm2_5_atm']),
                pm2_5_24h_average: stats['v5'],
                Label: results['Label'],
                Latitude: results['Lat'],
                Longitude: results['Lon'],
                AQI: calculatedAQI,
                AQIDescription: getAQIDescription(calculatedAQI),
                AQIMessage: getAQIMessage(calculatedAQI)
            }
        }
        else {
            console.log('could not find sensor data for ID', sensor_ID);
        }
        
    });
    return processedData;

}

/**
 * Update the sensors data to be displayed on the map
 * 
 */
const updateSensorData = async () => {

    const northCountySensors = [] //getNorthCountySensors();
    const CentralCounty = [] //getCentralCountySensors();
    const ruralTierSensors = [] //getRuralTiersSensors();
    const innerBeltwaySensors = [] //getInnerBeltwaySensors();
    const southCountySensors = [] //getSouthCountySensors();
    const allSensors = getSensorIDs();

    let allSensorsData = {};
    let northSensorsData = {};
    let centralSensorData = {};
    let ruralSensorsData = {};
    let innerBeltwayData = {};
    let southSensorData = {};

    try {
        const serverJson = await rawData();
        //console.log(serverJson);
        const sensorData = serverJson.data;
        console.log("inside updater", sensorData)
        allSensorsData = processedData(sensorData, allSensors);
        northSensorsData = processedData(sensorData, northCountySensors);
        centralSensorData = processedData(sensorData, CentralCounty);
        ruralSensorsData = processedData(sensorData, ruralTierSensors);
        innerBeltwayData = processedData(sensorData, innerBeltwaySensors);
        southSensorData = processedData(sensorData, southCountySensors);
    }
    catch(error) {
        console.log(error)
    }

    console.log('Updating data ...');

    const recentSensorData = {
        timestamp: Date.now(),
        schmidtSensorsData: allSensorsData,
        northCountySensorsData: northSensorsData,
        centralCountySensorsData: centralSensorData,
        ruralTierSensorsData: ruralSensorsData,
        innerBeltwaySensorsData: innerBeltwayData,
        southCountySensorsData: southSensorData

    }

    return recentSensorData;

}

export async function getUpdatedSensorsData()
{
    return (await updateSensorData());
}

export async function getUpdatedschmidtSensorsData()
{
    return (await updateSensorData()).schmidtSensorsData;
}

export async function getUpdatedNorthCountySensorsData()
{
    return (await updateSensorData()).northCountySensorsData;
}

export async function getUpdatedCentralCountySensorsData()
{
    return (await updateSensorData()).centralCountySensorsData;
}

export async function getUpdatedRuralTierSensorsData()
{
    return (await updateSensorData()).ruralTierSensorsData;
}

export async function getUpdatedInnerBeltwaySensorsData()
{
    return (await updateSensorData()).innerBeltwaySensorsData;
}

export async function getUpdatedsouthCountySensorsData()
{
    return (await updateSensorData()).southCountySensorsData;
}


// For testing
// async function logData()
// {
//     const sensorData = await getUpdatedSensorsData()
//     console.log(JSON.stringify(sensorData))
//     const div = document.createElement('div');
//     div.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(sensorData)}<br /><br />`;
//     $('body').append(div);
// }

// window.onload = logData;