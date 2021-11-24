
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

const northCounty = [
    102898, // PGCPS_Schmidt_CenterBldg (outside) ID 102898
    104786, // PGCPS_Schmidt_Orme (outside) ID 104786 currently offline
    102830, // PGCPS_LargoIntl_Rm125 (outside)
    102890, // PGCPS_GwynnPHS_Temp3 (outside)
    131815 // Riverdale Park (outside)
];

const innerBeltsway = [
    114799, // Cheverly (outside)
    57841,  // CheverlyAQM_W3_1 (outside)
    52833,  // CheverlyAQM_W1_2 (outside)
    53677,  // CheverlyAQM_W1_1 (outside)
    53663,  // CheverlyAQM_W1_3 (outside)
    53775,  // CheverlyAQM_W2_2 (outside)
    54259   // CheverlyAQM_W2_3 (outside)
];

const centralCounty = [];

const ruralTier = [];

const southCounty = [];

exports.addSensorByID = function (ID)
{
    sensorIDs.push(ID);
}

exports.addNorthCountySensorByID = function (ID)
{
    northCounty.push(ID);
}

exports.addInnerBeltswaySensorByID = function (ID)
{
    innerBeltsway.push(ID);
}

exports.addCentralCountySensorByID = function (ID)
{
    centralCounty.push(ID);
}

exports.addRuralTierSensorByID = function (ID)
{
    ruralTier.push(ID);
}

exports.addSouthCountySensorByID = function (ID)
{
    southCounty.push(ID);
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