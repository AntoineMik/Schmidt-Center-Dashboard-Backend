// Not in use

// Lists of sensors IDs
const sensorIDs = [102898, 104786, 2221, 8244, 8248];

const getLatestPurpleAirData = (sensorIDs) => {
    return new Promise((resolve, reject) => {
      const formattedSensorIds = sensorIDs.reduce((finalString, currentValue, index, source) => {
        return index < source.length ? finalString + '|' + currentValue.toString() : finalString + currentValue
      })
      let finalSensorData = []
      fetch(`https://www.purpleair.com/json?show=${formattedSensorIds}`)
        .then(res => res.json())
        .then(sensorDataJSON => {
          console.log(sensorDataJSON)
          if (sensorDataJSON.code) {
            if (sensorDataJSON.code !== 200) {
              throw new Error(sensorDataJSON.message)
            }
          }
          sensorIDs.forEach((sensorID, index) => {
            const reading = sensorDataJSON.results.find(data => data.ID === sensorID)
            if (reading !== undefined) {
              let stats = JSON.parse(reading['Stats'])
              console.log(sensorID, reading['Label'], reading['pm2_5_atm'], stats['v5'], calculateAQI.aqiFromPM(parseFloat(stats['v5'])))
              finalSensorData.push({
                ID: sensorID,
                pm2_5_current: parseFloat(reading['pm2_5_atm']),
                pm2_5_24h_average: stats['v5'],
                Label: reading['Label'],
                AQI: calculateAQI.aqiFromPM(parseFloat(stats['v5']))
              })
            } else {
              console.log('could not find sensor data for ID', sensorID)
            }
          })
          resolve({
            error: false,
            data: finalSensorData
          })
        }).catch(err => {
          reject({
            error: true,
            message: err.message,
            data: finalSensorData
          })
        });
    })
}

  
// Find matched from the raw data based on the search
function findMatches(search, rawdata)
{
    // look throught the entire file regarless of case sensitivity
    return rawdata.filter(
        sensor =>
        {
            const regex = new RegExp(search, 'gi');
            return sensor.ID.match(regex)

        }
    );
}


// display restaurants when available
function displayResult()
{
    const testing = await getLatestPurpleAirData(sensorIDs)
    let htmlList = `<h4 class="ID">testing</h4>`;
    const matchSensors = findMatches(this.value, testing);
    htmlList = testing.map( sensors => {
                return `
                    <li class="list">
                        <h4 class="ID">${sensors.ID}</h4>
                        <address>
                            <span class="id">${sensors.Lat} <br>
                                ${sensors.Lon} <br> ${sensors.DEVICE_LOCATIONTYPE}</span>
                        </address>
                        <p class="inspection">Style: ${sensors.Label}</p>
                        <p class="inspection"> Type Of Inspection: ${sensors.PM2_5Value} <br> 
                                            Result: ${sensors.Stats}</p>
                    </li>
                    `;
                }
    ).join("");

    results.innerHTML = htmlList;
}





const searching = document.querySelector(".searchbox");
const results = document.querySelector(".results");

searching.addEventListener("change", displayResult);
searching.addEventListener("keyup", displayResult);