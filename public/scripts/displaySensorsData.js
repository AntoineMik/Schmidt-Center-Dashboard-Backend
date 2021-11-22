import { getProcessedSensorData } from "./loadSensorsData.js"
import {getThingspeakProcessedData} from "./processThingspeakData.js"


// Display sensors data as a string
function displaySensorData ()
{
    const processedSensorsData = getProcessedSensorData();
    console.log(processedSensorsData);
    const div = document.createElement('div');
    div.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(processedSensorsData)}<br /><br />`;
    $('body').append(div);

}


// Display sensors data as a string
function thingspeakSensorData()
{
    const thingspeakSensorData = getThingspeakProcessedData();
    //console.log(processedSensorsData);
    console.log(thingspeakSensorData);
    console.log(thingspeakSensorData)
    const div = document.createElement('div');
    div.innerHTML = `<h2>What we have</h2> <br />${
        (JSON.stringify(thingspeakSensorData))}<br /><br />`;
    $('body').append(div);

}

//window.onload = displaySensorData;
//window.onload = thingspeakSensorData;