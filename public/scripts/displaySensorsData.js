import { getProcessedSensorData } from "./loadSensorsData.js"


// Display sensors data as a string
function displaySensorData ()
{
    const processedSensorsData = getProcessedSensorData();
    console.log(processedSensorsData);
    const div = document.createElement('div');
    div.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(processedSensorsData)}<br /><br />`;
    $('body').append(div);

}

window.onload = displaySensorData;