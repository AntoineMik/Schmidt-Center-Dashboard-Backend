//import DataFrame from 'dataframe-js';

import { getProcessedSensorData } from "./loadSensorsData.js"

const processedSensorsData = getProcessedSensorData()
const start_date = "2021-10-01";
const end_date = "2021-11-01";
const thingspeakRawData = [];
//const thingspeakSensorData = new DataFrame();

// Thingspeak url 
const url_format = "https://api.thingspeak.com/channels/1528637/feeds.json?api_key=1A251WS2VFDQ0GGC&start=2021-10-01&end=2021-11-01"


async function getData()
{
    console.log(processedSensorsData)
    return new Promise((resolve, reject) => {
        
        processedSensorsData.forEach((sensor) => {
            const url = `https://api.thingspeak.com/channels/${sensor["THINGSPEAK_PRIMARY_Channel_ID"]}/feeds.json?api_key=${sensor["THINGSPEAK_PRIMARY_API_KEY"]}&start=${start_date}&end=${end_date}`
            console.log(url)
            console.log(sensor)
            fetch(url).then(res => res.json())
            .then(response => {
                console.log(response)
                if(response.status) {
                    if(response.status !== 200) {throw new Error(response.message)}
                }
                thingspeakRawData.push({
                    ID: sensor.ID,
                    Channel: response.channel,
                    Feeds: response.feeds
                })

                resolve({
                    error: false,
                    data: thingspeakRawData
                  })
    
            })
            .catch(err => {
                reject({
                  error: true,
                  message: err.message,
                  data: thingspeakRawData
                })
              })
            
        })
    })
}


//console.log(thingspeakSensorData)

export async function getThingspeakData()
{
    let sensorData = []
    try {
        sensorData = await getData()
        return sensorData
    }
    catch (err){
        console.log(err)
    }
}