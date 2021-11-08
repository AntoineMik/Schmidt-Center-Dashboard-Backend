// Lists of sensors IDs
const sensorIDs = [102898, 104786, 2221, 8244, 8248];
const sensorsData = [];
const rawdata = [];
// Get data from server into our array as a json
/*function runThisWithResultsFromServer(jsonFromServer)
{
    console.log('jsonFromServer', jsonFromServer);
    return jsonFromServer;
}

async function loadData()
{
    fetch('/api', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    
    })
      .then((fromServer) => fromServer.json())
      .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
      .catch((err) => {
        console.log(err);
    });
}
*/

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

    
}

//getDatafromserver()
console.log(rawdata);

window.onload = mainThread