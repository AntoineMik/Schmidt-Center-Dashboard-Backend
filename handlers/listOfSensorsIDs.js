
// List of the sensors
let sensorIDs = [

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
    53775  // CheverlyAQM_W2_2 (outside)
    //54259   // CheverlyAQM_W2_3 (outside)
];

// North county: 39.019989, -76.879418
const northCounty = [
    102898, // PGCPS_Schmidt_CenterBldg (outside) ID 102898
    104786, // PGCPS_Schmidt_Orme (outside) ID 104786 currently offline
    102830, // PGCPS_LargoIntl_Rm125 (outside)
    102890, // PGCPS_GwynnPHS_Temp3 (outside)
    131815 // Riverdale Park (outside)
];

// Inner Beltway: 38.859444,-76.889167
const innerBeltsway = [
    114799, // Cheverly (outside)
    57841,  // CheverlyAQM_W3_1 (outside)
    52833,  // CheverlyAQM_W1_2 (outside)
    53677,  // CheverlyAQM_W1_1 (outside)
    53663,  // CheverlyAQM_W1_3 (outside)
    53775,  // CheverlyAQM_W2_2 (outside)
    54259   // CheverlyAQM_W2_3 (outside)
];

// Central County: 38.8275,-76.751111
const centralCounty = [];

// Rural Tier: 38.698611,-76.849167
const ruralTier = [];

// South County: 38.810556,-76.946389
const southCounty = [];

exports.addSensorByID = function (ID)
{
    console.log("Sensor id to add", ID);
    sensorIDs.push.apply(ID);
    console.log("New list", sensorIDs)
}

exports.addNorthCountySensorByID = function (ID)
{
    northCounty.push.apply(ID);
}

exports.addInnerBeltswaySensorByID = function (ID)
{
    innerBeltsway.push.apply(ID);
}

exports.addCentralCountySensorByID = function (ID)
{
    centralCounty.push.apply(ID);
}

exports.addRuralTierSensorByID = function (ID)
{
    ruralTier.push.apply(ID);
}

exports.addSouthCountySensorByID = function (ID)
{
    southCounty.push.apply(ID);
}


exports.listSensors = function(){
    return sensorIDs;
}

exports.getSensorsIDs = function(){
    return sensorIDs;
}

exports.getInnerBeltwaySensorsIds = function(){
    return innerBeltsway;
}

exports.getNorthCountySensorsIds = function(){
    return northCounty;
}

exports.getCentralCountySensorsIds = function(){
    return centralCounty;
}

exports.getRuralTierSensorsIds = function(){
    return ruralTier;
}

exports.getSouthCountySensorsIds = function(){
    return southCounty;
}