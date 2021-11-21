import { aqiFromPM, getAQIDescription, getAQIMessage } from "./AQIcalculator.js";
import { getUpdatedSensorsData } from "./purpleairDataHandler.js";

/**
 * This function get the data from thingspeak after retreiving the sensor's channel id and API from
 * purpleair data.
 * @param {*} sensor_IDs: array of sensor ids to retreive the data for. Could be an array of one value 
 * @param {*} start_date: The start date for which to retreive the data. 
 * @param {*} end_date: The End date for which to retreive the data. 
 * @returns: Returns an array of objects representing the data retreived. 
 */
const getTimeData = async (sensor_IDs, start_date, end_date) => {

    // Retreive updated sensor data from purpleair
    const purpleairData = await getUpdatedSensorsData();
    console.log(purpleairData);
    const purpleairSchmidtSensorsData = purpleairData.schmidtSensorsData;
    console.log(purpleairSchmidtSensorsData)

    return new Promise((resolve, reject) => {

        try {
            const thinkspeakSensorsData = {};
            // Retreive data for each sensor id passed
            sensor_IDs.forEach(sensor_ID => {
                // Get sensor data from purpleair
                let sensorData = purpleairSchmidtSensorsData[sensor_ID];
                console.log("Inside get time", sensorData);
                // Get channel id and api key for the sensor
                let channelID = sensorData.Primary_Channel_ID;
                let APIKey = sensorData.Primary_KEY;
                // Modify the url according to the sensor channel id and api key
                const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${APIKey}&start=${start_date}&end=${end_date}`;
                console.log(url);
                // Fetch the data from thingspeak making sure we have a valid response.
                // Using a promise to ensure we get valid date befor proceding.
                const promise = new Promise ((resolve, reject) => {
                    fetch(url).then(res => res.json())
                    .then( response => {
                        console.log("inside get time data", response)
                        // Listen for error code from the response. 
                        // More on thingpeak errors here: https://uk.mathworks.com/help/thingspeak/error-codes.html
                        if(response.status) {
                            if(response.status !== 200) {throw new Error(response.message)}
                        }
                        // Return the response when the promise is resolved
                        resolve({
                            error: false,
                            data: response
                        })
                    }).catch (err => {
                        // catch error and return the error message
                        reject({
                            error: true,
                            message: err.message,
                            data: response
                        })
                    })
    
                });

                // Promise is fulfiled at this point. Adding value to the array
                promise.then( (val) => {

                    thinkspeakSensorsData[sensor_ID] = {
                        channel: val.data.channel,
                        feeds: val.data.feeds
                    }

                })

            });

            resolve ({
                error: false,
                value: thinkspeakSensorsData
            });
        }
        catch (err) {
            reject ({
                error: true,
                message: err.message,
                //value: thinkspeakSensorsData
            })
        }

    });
    
    

    // // Retreive data for each sensor id passed
    // sensor_IDs.forEach(sensor_ID => {
    //     // Get sensor data from purpleair
    //     let sensorData = purpleairSchmidtSensorsData[sensor_ID];
    //     console.log("Inside get time", sensorData)
    //     // Check for valid data
    //     if(sensorData !== undefined)
    //     {
    //         // Get channel id and api key for the sensor
    //         let channelID = sensorData.Primary_Channel_ID;
    //         let APIKey = sensorData.Primary_KEY;
    //         // Modify the url according to the sensor channel id and api key
    //         const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${APIKey}&start=${start_date}&end=${end_date}`;
    //         console.log(url);
    //         // Fetch the data from thingspeak making sure we have a valid response.
    //         // Using a promise to ensure we get valid date befor proceding
    //         const promise = new Promise ((resolve, reject) => {
    //             fetch(url).then(res => res.json())
    //             .then( response => {
    //                 console.log("inside get time data", response)
    //                 // Listen for error code from the response. 
    //                 // More on thingpeak errors here: https://uk.mathworks.com/help/thingspeak/error-codes.html
    //                 if(response.status) {
    //                     if(response.status !== 200) {throw new Error(response.message)}
    //                 }
    //                 // Return the response when the promise is resolved
    //                 resolve({
    //                     error: false,
    //                     data: response
    //                 })
    //             }).catch (err => {
    //                 // catch error and return the error message
    //                 reject({
    //                     error: true,
    //                     message: err.message,
    //                     data: response
    //                 })
    //             })

    //         })

    //         // Promise is fulfiled at this point. Adding value to the array
    //         promise.then( (val) => {

    //             // thinkspeakSensorsData.push({
    //             //     sensor_ID: sensor_ID,
    //             //     channel: val.data.channel,
    //             //     feeds: val.data.feeds
    //             // })

    //             thinkspeakSensorsData[sensor_ID] = {
    //                 channel: val.data.channel,
    //                 feeds: val.data.feeds
    //             }


    //         })

    //     }
    //     else {
    //         console.log("Invalid sensor ID: ", sensor_ID);
    //     }
        
    // });

    // return thinkspeakSensorsData;

}

/**
 * This function process the data from thingspeak ensuring proper field name
 * @param {*} data_to_process : Raw sensor data to be processed
 * @returns : The processed sensor data
 */
const processThingspeakData = (data_to_process) =>
{
    const thingspeakProcessedData = [];
    console.log("testing 212", (data_to_process));
    const test = Object.keys(data_to_process);
    console.log("Keys here", test);
    data_to_process.forEach(element => {

         console.log("testing 3", element);
        // Reprocessing the fields to their correct names indicated in the channels of the data
        const reg = /[^a-zA-Z\d:\u00C0-\u00FF]/g
        let processed = element.Feeds.map(el => JSON.parse(JSON.stringify(el)
            .replaceAll("field1", element.Channel.field1.replace(reg,""))
            .replaceAll("field2", element.Channel.field2.replace(reg,""))
            .replaceAll("field3", element.Channel.field3.replace(reg,""))
            .replaceAll("field4", element.Channel.field4.replace(reg,""))
            .replaceAll("field5", element.Channel.field5.replace(reg,""))
            .replaceAll("field6", element.Channel.field6.replace(reg,""))
            .replaceAll("field7", element.Channel.field7.replace(reg,""))
            .replaceAll("field8", element.Channel.field8.replace(reg,""))
        ))

        // Adding AQI values and message to results
        processed.forEach(el => {
            let calculatedAQI = aqiFromPM(parseFloat(el['PM25ATM']));
            el.AQI = calculatedAQI;
            el.AQIDescription = getAQIDescription(calculatedAQI);
            el.AQIMessage = getAQIMessage(calculatedAQI);
        });

        console.log("Inside processed think data", element.Feeds);
        console.log(processed[0].PM10ATM);

        // Save processed data to new array
        thingspeakProcessedData.push({
            sensor_ID: element.sensor_ID,
            channel: element.channel,
            feeds: processed
        });
        
    });
    return thingspeakProcessedData;

}

// Get the processed data
export async function getThingspeakProcessedData(sensor_IDs, start_date, end_date)
{
    return processThingspeakData((await getTimeData(sensor_IDs, start_date, end_date)));
}

// Get the raw data
export async function getThingspeakRawData(sensor_IDs, start_date, end_date)
{
    try {
        const shmidthSensorsData = await getTimeData(sensor_IDs, start_date, end_date);
        return shmidthSensorsData;

    } catch (err) {
        console.log(err)
    }
    
}

// For testing 
// async function logData()
// {
//     const sensor_IDs = [131815, 102898];
//     console.log("testing", sensor_IDs)
//     const start_date = "2021-10-01";
//     const end_date = "2021-11-01";
//     //const singleSensorData = (await getThingspeakRawData(sensor_IDs, start_date, end_date))
//     const singleSensorData = (await getTimeData(sensor_IDs, start_date, end_date))
//     console.log('Inside load data', singleSensorData.value);
//     console.log(JSON.stringify(singleSensorData))
//     const div = document.createElement('div');
//     div.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(singleSensorData)}<br /><br />`;
//     $('body').append(div);
// }

// window.onload = logData;