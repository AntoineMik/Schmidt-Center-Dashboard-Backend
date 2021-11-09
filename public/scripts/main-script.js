//const calculateAQI = require('./AQIcalculator');
// Lists of sensors IDs
const sensorIDs = [102898, 104786, 2221, 8244, 8248];
// Holds processed sensor data
const sensorsData = [];
// Holds raw sensor data
const rawdata = [];

function dummy(v){
return v;
}

// Process raw data from server. Here we can decide what entries from the sensors matters
function processServerData(jsonFromServer)
{

    if(jsonFromServer.code)
    {
        if(jsonFromServer.code !== 200)
        {
            throw new Error(jsonFromServer.message);
        }
    }

    // Saves the raw sensor data
    rawdata.push(jsonFromServer.results);

    // Process each sensor data
    sensorIDs.forEach((sensorID) => {
        const results = jsonFromServer.results.find(read => read.ID === sensorID)
        if(results !== undefined)
        {
            let stats = JSON.parse(results['Stats'])
            sensorsData.push({
                ID: sensorID,
                pm2_5_current: parseFloat(results['pm2_5_atm']),
                pm2_5_24h_average: stats['v5'],
                Label: results['Label'],
                Latitude: results['Lat'],
                Longitude: results['Lon'],
                AQI: parseFloat(stats['v5'])
    
            })
        }
        else
        {
            console.log('could not find sensor data for ID', sensorID)
        }
    })

    const div = document.createElement('div');
    div.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(sensorsData)}<br /><br />`;
    $('body').append(div);

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
          processServerData(jsonFromServer);
        })
      .catch((err) => {
        console.log(err);
    });
}


// Get data on window load.
window.onload = loadData