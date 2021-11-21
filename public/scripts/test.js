import { aqiFromPM, getAQIDescription, getAQIMessage } from "./AQIcalculator.js";
import { getUpdatedSensorsData } from "./purpleairDataHandler.js";

// Retreive updated sensor data from purpleair

const getTimeData = async (sensor_IDs, start_date, end_date) => {
    const purpleairData = await getUpdatedSensorsData();
    console.log(purpleairData);
    const purpleairSchmidtSensorsData = purpleairData.schmidtSensorsData;
    console.log(purpleairSchmidtSensorsData);
    const thinkspeakSensorsData = [];
    let test = 0;

    return new Promise((resolve, reject) => {
    try {

        sensor_IDs.forEach(sensor_ID => {
            test = test + 1;
            console.log("Testing loop", test)
            
            let sensorData = purpleairSchmidtSensorsData[sensor_ID];
            console.log("Inside get time", sensorData);
            // Get channel id and api key for the sensor
            let channelID = sensorData.Primary_Channel_ID;
            let APIKey = sensorData.Primary_KEY;
            // Modify the url according to the sensor channel id and api key
            const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${APIKey}&start=${start_date}&end=${end_date}`;
            console.log(url);
    
            fetch(url).then(res => res.json())
            .then( response => {
                console.log("inside get time data", response)
                // Listen for error code from the response. 
                // More on thingpeak errors here: https://uk.mathworks.com/help/thingspeak/error-codes.html
                if(response.status) {
                    if(response.status !== 200) {throw new Error(response.message)}
                }

                thinkspeakSensorsData.push({
                    sensor_ID: sensor_ID,
                    channel: response.channel,
                    feeds: response.feeds
                })

                // thinkspeakSensorsData[sensor_ID] = {
                //     channel: response.channel,
                //     feeds: response.feeds
                // }

            })
        })

        resolve({
            error: false,
            data: thinkspeakSensorsData
        })

    }
    catch(err) {
        console.log(err.message);

        reject({
            error: true,
            message: err.message,
            data: thinkspeakSensorsData
        })

    }
    })

    //return thinkspeakSensorsData;
}



// For testing 
async function logData()
{
    const sensor_IDs = [131815, 102898];
    console.log("testing", sensor_IDs)
    const start_date = "2021-10-01";
    const end_date = "2021-11-01";
    //const singleSensorData = (await getThingspeakRawData(sensor_IDs, start_date, end_date))
    const singleSensorData = (await getTimeData(sensor_IDs, start_date, end_date))
    console.log('Inside load data', singleSensorData);
    console.log(JSON.stringify(singleSensorData))
    singleSensorData.forEach(el =>
        {
            console.log("Here we are", el)
        })
    const div = document.createElement('div');
    div.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(singleSensorData)}<br /><br />`;
    $('body').append(div);
}

window.onload = logData;