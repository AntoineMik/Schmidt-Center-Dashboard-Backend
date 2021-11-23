var express = require('express');
var router = express.Router();

var thingspeakHandler = require('../handlers/thingspeakDataHandler');

let a_middleware_function = async function(req, res, next) {
    //... perform some operations

    try {
        var param = req.params;
        console.log("Parameters entered:", param)
        var sensor_IDs = param.sensorsIDs;
        var start = param.start;
        var end = param.end;
        
        if(sensor_IDs_isValid(sensor_IDs) && time_isValid(start) && time_isValid(end))
        {
            console.log("Valid param format:", param)

            var data = await thingspeakHandler.getThingspeakProcessedData(sensor_IDs.split(','), start, end);
            res.status(200).json(data);

        }
        else {
            throw new Error("Invalid parameters enterred, format is : /123,3232,...]/2021-12-01/2021-12-02 ");
        }

        //var data = await thingspeakHandler.getThingspeakRawData(sensor_IDs, start, end);
        //res.status(200).json(data);
    }
    catch (err) {
        console.log("Invalid Parameters entered:", req.params)
        res.status(500).send(err.message);
    } 
 // Call next() so Express will call the next middleware function in the chain.
}


/* GET processed data for all sensors and PG areas. */
router.get('/:sensorsIDs/:start/:end', a_middleware_function)

// async function (req, res) {

//     try {
//         var param = req.params;
//         console.log("Parameters entered:", param)
//         var sensor_IDs = param.sensorsIDs;
//         var start = param.start;
//         var end = param.end;

//         //var data = await thingspeakHandler.getThingspeakRawData(sensor_IDs, start, end);
//         //res.status(200).json(data);
//     }
//     catch (err) {
//         console.log("Parameters entered:", req.params.param)
//         res.status(500).send("Invalid parameters enterred, format is : {sensorIDs:[], start: startDate, end: endDate} ");
//     } 

// });

function sensor_IDs_isValid(sensor_IDs) {
    const arr = sensor_IDs.split(',');
    return Array.isArray(arr);
}

function time_isValid(time) {
    const reg = /\d{4}-\d{2}-\d{2}/
    if(time.match(reg) !== null){
        return true;
    }
    return false;
}


module.exports = router;