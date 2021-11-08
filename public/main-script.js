// Lists of sensors IDs
const sensorIDs = [102898, 104786, 2221, 8244, 8248];
const sensorsData = [];
const rawdata = [];

// Process raw data from server. Here we can decide what entries from the sensors matters
function processServerData(jsonFromServer)
{
    const results = jsonFromServer.results;
    if(results !== undefined)
    {
        let stats = JSON.parse(results['Stats']);
        console.log(results['ID'], results['Label'], results['pm2_5_atm'], stats['v5']);
        sensorsData.push({
            ID: results['ID'],
            pm2_5_current: parseFloat(reading['pm2_5_atm']),
            pm2_5_24h_average: stats['v5'],
            Label: reading['Label'],

        })
    }
    else 
    {
        console.log('could not find sensor data for ID')
    }
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
      .then((jsonFromServer) => processServerData(jsonFromServer))
      .catch((err) => {
        console.log(err);
    });
}




window.onload = loadData;
/*
async function getDatafromserver()
{

        fetch('/api', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then((fromServer) => fromServer.json())
          .then((jsonFromServer) => rawdata.push(jsonFromServer))
          .catch((err) => {
            console.log(err);
          });
}

async function mainThread()
{
    console.log('Firing main thread');
    //const rawData = await loadData();
    await getDatafromserver();

    const sensorData = JSON.parse(rawdata.getItem("results"));

    sensorData.forEach(ID => {
        console.log(ID)
    })

    var list = document.getElementById("dynamic-list");
    var li = document.createElement("li");

    list.appendChild(sensorData);  
}
*/
