import { aqiFromPM, getAQIDescription, getAQIMessage } from "./AQIcalculator.js";
import { getUpdatedSensorsData } from "./purpleairDataHandler.js";

const start_date = "2021-10-01";
const end_date = "2021-11-01";

// const test = {};
// const rawSensorData = [];
// const thingspeakProcessedData = [];

const getSingleSensorData = async(sensor_ID, channel_id, API_key) =>
{
    const singleSensorData = [];
    const test = {};

    return new Promise((resolve, reject) => {
        const url = `https://api.thingspeak.com/channels/${channel_id}/feeds.json?api_key=${API_key}&start=${start_date}&end=${end_date}`
        console.log(url)
        fetch(url).then(res => res.json())
        .then(response => {
            console.log(response)
            if(response.status) {
                if(response.status !== 200) {throw new Error(response.message)}
            }
            
            test[sensor_ID] = response.feeds
            console.log(test)

            singleSensorData.push({
                ID: sensor_ID,
                Channel: response.channel,
                Feeds: response.feeds
            })

            resolve({
                error: false,
                data: singleSensorData
              })

        })
        .catch(err => {
            reject({
              error: true,
              message: err.message,
              data: singleSensorData
            })
          })
    })
}


const getMultipleSensorData = async(sensor_IDs) =>
{
    const multipleSensorsData = [];
    
    try {
        // Retreive updated sensor data from purpleair
        const purpleairData = await getUpdatedSensorsData();
        console.log(purpleairData);
        const purpleairSchmidtSensorsData = purpleairData.schmidtSensorsData;
        console.log("Hey , look", purpleairSchmidtSensorsData);

        for(let sensor_ID of sensor_IDs) {
            console.log("sensore id", sensor_ID)
            // Get sensor data from purpleair
            let sensorData = purpleairSchmidtSensorsData[sensor_ID];
            console.log("Inside mult sensors", sensorData);
            // Get channel id and api key for the sensor
            let channel_id = sensorData.Primary_Channel_ID;
            let API_key = sensorData.Primary_KEY;
            let thisSensorData = await getSingleSensorData(sensor_ID, channel_id, API_key);
    

            multipleSensorsData.push(thisSensorData.data);
            console.log("Inside mult sensors 21", multipleSensorsData);
        }

    }
    catch (err)
    {
        console.log(err.message);

    }

    return multipleSensorsData;

}

const sensor_ID = [131815, 104786]
const channel_id = "1528635"
const API_key = "H8C9B4OE7X2OHKA6"

// async function logData()
// {
//     const singleSensorData = await getMultipleSensorData(sensor_ID)
//     console.log(JSON.stringify(singleSensorData))
//     //processThinkspeakData(singleSensorData)
//     const div = document.createElement('div');
//     div.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(singleSensorData)}<br /><br />`;
//     $('body').append(div);
// }

// window.onload = logData;