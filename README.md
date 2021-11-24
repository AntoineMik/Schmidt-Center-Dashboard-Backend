# Schmidt-Center-Dashboard-Backend

This project creates an API to interface with the Schmidt center Dashboard. It allows users to visualize the air quality data from sensors on the purple air network. In addition, the system will obtain and process data collected from the air quality sensors and Thingspeak API and provide documentation that enables users to navigate the interface and administrators to manage and update the system. Below are lists of routes this project supports:

<pre>
<b>Backend Routes

/sensors: An Array List of all available sensors. 
Each element in the array is an INTEGER representing a sensor ID.
/purpleair: Returns the raw sensors data from Purpleair of the available sensors.
/processed: Returns an object containing the following:
 timestamp: Current timestamp
 schmidtSensorsData: Returns all processed sensors sata,
 northCountySensorsData: North county processed sensors data,
 centralCountySensorsData: Central county processed sensors data,
 ruralTierSensorsData: Rural tier processed sensors Data,
 innerBeltwaySensorsData: Inner Beltway processed sensors Data,
 southCountySensorsData: South county processed sensor data

Processed data includes AQI calculation, AQI description, and AQI message.
The processed data link the sensor ID to the sensor data as follow:
processedData[sensor_ID] = {
                Primary_Channel_ID : The THINGSPEAK PRIMARY Channel ID,
                Primary_KEY : The THINGSPEAK PRIMARY ID READ,
                Secondary_Channel_ID : The THINGSPEAK SECONDARY Channel,
                Secondary_KEY : The THINGSPEAK SECONDARY ID READ KEY,
                pm2_5_current: A Float value of the current pm2.5 ATM reading,
                pm2_5_24h_average: A Float value of 24h average pm2.5 reading,
                Label: A string of the label given to the sensor,
                Latitude: The latitude coordinates of the sensor,
                Longitude: The Longitude coordinate of the sensor,
                AQI: The calculated Air Quality Index (AQI),
                AQIDescription: The AQI Description of the calculated AQI,
                AQIMessage: The AQI Message of the calculated AQI
            }

/processed/schmidt: Return only Schmidt Center processed sensors data.
/processed/north: Returns only PG North County processed sensors data.
/processed/central: Returns only PG Central County processed sensors data.
/processed/rural: Returns only PG Rural Tier processed sensors data.
/processed/inner: Returns only PG Inner Beltway processed sensors data.
/processed/south: Returns only PG South County processed sensors data.

/thingspeak/sensor-ids/start-date/end-date: 
Returns thingspeak processed data for the list or the individual sensor id for 
the specified start and end date.
Sensor-ids: A comma-separated sensors ids or a single sensor id. 
(ex: 131815, or 131815,102898,114799 ). 
The sensors id passed need to be valid or an empty object will be returned.
Start-date: The start date of interest. The format is as follows: 2021-12-01
End-date: The end date of interest. The format is as follows: 2021-12-02
<strong>One or more invalid parameters will cause a 500 error with an error message.</strong>

Other Routes:
/thingspeak: Gives a description of the appropriate format to follow for 
thingspeak processed data query.
</pre>


 
