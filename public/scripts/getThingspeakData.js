import { aqiFromPM, getAQIDescription, getAQIMessage } from "./AQIcalculator.js";
import { getProcessedSensorData } from "./loadSensorsData.js"

const start_date = "2021-10-01";
const end_date = "2021-11-01";

const singleSensorData = []
const rawSensorData = []
const thingspeakProcessedData = []

async function getSingleSensorData(sensor_ID, channel_id, API_key)
{
    return new Promise((resolve, reject) => {
        const url = `https://api.thingspeak.com/channels/${channel_id}/feeds.json?api_key=${API_key}&start=${start_date}&end=${end_date}`
        console.log(url)
        fetch(url).then(res => res.json())
        .then(response => {
            console.log(response)
            if(response.status) {
                if(response.status !== 200) {throw new Error(response.message)}
            }
            
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

async function getMultipleSensorData(sensor_ID_list, channel_id_list, API_key_list)
{

}

function processThinkspeakData(data_to_process)
{
    data_to_process.forEach(element => {
        // Reprocessing the fields to their correct names indicated in channels
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

        // Adding AQI value
        processed.forEach(el => {
            let calculatedAQI = aqiFromPM(parseFloat(el['PM25ATM']))
            el.AQI = calculatedAQI
        })

        // processed.push({
        //     AQI: calculatedAQI,
        //     AQIDescription: getAQIDescription(calculatedAQI),
        //     AQIMessage: getAQIMessage(calculatedAQI)
        // })
        console.log(element.Feeds)
        console.log(processed[0].PM10ATM)

        // Save processed data to new array
        thingspeakProcessedData.push({
            ID: element.ID,
            Channel: element.Channel,
            Feeds: processed
        })
        
    });

}


const sensor_ID = 131815
const channel_id = "1528635"
const API_key = "H8C9B4OE7X2OHKA6"

async function logData()
{
    await getSingleSensorData(sensor_ID, channel_id, API_key)
    console.log(JSON.stringify(singleSensorData))
    processThinkspeakData(singleSensorData)
    const div = document.createElement('div');
    div.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(thingspeakProcessedData)}<br /><br />`;
    $('body').append(div);
}

window.onload = logData;