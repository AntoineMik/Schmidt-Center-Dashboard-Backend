
// List of the sensors
const sensorIDs = [

    102898, // PGCPS_Schmidt_CenterBldg (outside) ID 102898
    104786, // PGCPS_Schmidt_Orme (outside) ID 104786 currently offline
    102830, // PGCPS_LargoIntl_Rm125 (outside)
    102890, // PGCPS_GwynnPHS_Temp3 (outside)
    131815, // Riverdale Park (outside)
    114799, // Cheverly (outside)
    57841,  // CheverlyAQM_W3_1 (outside)
    52833,  // CheverlyAQM_W1_2 (outside)
    53677,  // CheverlyAQM_W1_1 (outside)
    53663,  // CheverlyAQM_W1_3 (outside)
    53775,  // CheverlyAQM_W2_2 (outside)
    54259   // CheverlyAQM_W2_3 (outside)
];


function addSensorByID (ID)
{
    sensorIDs.push(ID);
}

// export function getSensorIDs()
// {
//     return sensorIDs;
// }

exports.listSensors = function(){
    return sensorIDs;
}

exports.getSensorsIDs = function(){
    return sensorIDs;
}